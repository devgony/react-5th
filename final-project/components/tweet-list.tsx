import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatToTimeAgo } from "@/lib/utils";
import Avatar from "./avatar";
import { getMoreTweets, Tweets } from "@/app/actions";

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
          className="flex h-48 w-full cursor-pointer justify-between rounded-xl bg-secondary p-4 text-secondary-foreground"
        >
          <section className="flex w-3/4 flex-col gap-2">
            <span className="flex items-center gap-2">
              <Avatar username={username} />
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
            className="size-24 border border-primary object-cover"
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
          className="mx-auto w-fit rounded-md bg-primary px-3 py-2 text-sm font-semibold hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩 중" : "Load more"}
        </span>
      ) : null}
    </>
  );
}
