import { Tweet } from "@prisma/client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { TweetType } from "@/lib/schema";
import { getMoreTweets, Tweets } from "@/app/actoins";
import { useEffect, useRef, useState } from "react";
import { formatToTimeAgo } from "@/lib/utils";

interface Props {
  initTweets: Tweets;
}
export default function TweetList({ initTweets }: Props) {
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
      {tweets?.map(({ user: { username }, title, content, id, updated_at }) => (
        <Link
          href={`/tweets/${id}`}
          key={id}
          className="bg-secondary w-full cursor-pointer rounded-xl text-secondary-foreground p-4 flex justify-between h-48"
        >
          <section className="w-3/4 flex flex-col gap-2 justify-center">
            <span className="flex gap-2 items-center">
              <Avatar className="size-12">
                <AvatarImage src="https://github.com/devgony.png" />
                <AvatarFallback>avatar</AvatarFallback>
              </Avatar>
              <p className="text-blue-400">{username}</p>
              <p className="text-xs text-muted-foreground">
                {formatToTimeAgo(updated_at.toString())}
              </p>
            </span>
            <h2 className="text-xl font-bold">{title}</h2>
            <h3 className="line-clamp-3 text-sm text-muted-foreground">
              {content}
            </h3>
          </section>
          <Image
            className="object-cover size-24 border border-primary"
            src="/welcome.png"
            alt="welcome"
            width={30}
            height={30}
          />
        </Link>
      ))}
      {!isLastPage ? (
        <span
          ref={trigger}
          className="text-sm font-semibold bg-primary w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩 중" : "Load more"}
        </span>
      ) : null}
    </>
  );
}
