"use client";
import Link from "next/link";
import getTweets, { Tweets } from "./actoins";
import { useEffect, useState } from "react";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";

export default function Home() {
  const [page, setPage] = useState(0);
  const [tweets, setTweets] = useState<Tweets>();
  const [total, setTotal] = useState<number>();
  useEffect(() => {
    getTweets(page).then(({ tweets, total }) => {
      setTweets(tweets);
      setTotal(total);
    });
  }, [page]);
  return (
    <div className="flex flex-col">
      <div className="flex">
        <GrCaretPrevious
          className="cursor-pointer"
          onClick={() => setPage((prev) => (prev > 0 ? --prev : prev))}
        />
        <h2>{page + 1}</h2>
        <GrCaretNext
          className="cursor-pointer"
          onClick={() =>
            setPage((prev) => (total && prev < total - 1 ? ++prev : prev))
          }
        />
      </div>
      {tweets?.map(({ userId, tweet, id }) => (
        <Link
          href={`/tweets/${id}`}
          key={id}
          className="flex bg-green-300 w-fit cursor-pointer"
        >
          <h2>{userId} said: </h2>
          <h2>{tweet}</h2>
        </Link>
      ))}
    </div>
  );
}
