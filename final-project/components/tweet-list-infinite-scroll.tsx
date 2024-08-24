"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatToTimeAgo } from "@/lib/utils";
import Avatar from "./avatar";
import { getMoreTweets, Tweets } from "@/app/actions";
import TweetList from "./tweet-list";

interface Props {
  initTweets: Tweets;
}
export default function TweetListInifiteScroll({ initTweets }: Props) {
  const [tweets, setTweets] = useState(initTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newProducts = await getMoreTweets(page + 1);
          if (newProducts.length !== 0) {
            setTweets((prev) => [...prev, ...newProducts]);
            setPage((prev) => prev + 1);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      {
        threshold: 1.0,
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page]);
  return (
    <>
      <TweetList tweets={tweets} />
      {!isLastPage ? (
        <span
          ref={trigger}
          className="mx-auto w-fit rounded-md bg-primary px-3 py-2 text-sm font-semibold hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩 중" : "Load more"}
        </span>
      ) : null}
    </>
  );
}
