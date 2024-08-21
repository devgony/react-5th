"use client";
import Link from "next/link";
import getTweets, { Tweets } from "./actoins";
import { useEffect, useState } from "react";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import AddTweet from "../components/add-tweet";
import { BsPostcardHeart } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import Image from "next/image";
import { FaCirclePlus } from "react-icons/fa6";

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

  const [showInput, setShowInput] = useState(false);

  const toggleInput = () => {
    setShowInput(!showInput);
  };
  return (
    <main className="flex flex-col justify-center gap-2">
      {showInput && <AddTweet />}
      <header className="flex justify-between items-center">
        <span className="flex items-center gap-2">
          <BsPostcardHeart className="w-10 h-10" />
          <h1 className="text-lg font-bold">Tweets</h1>
        </span>
        <IoSearch className="w-10 h-10" />
      </header>
      {/* TODO: Select Sort & View */}
      {tweets?.map(({ user: { username }, tweet, id }) => (
        <Link
          href={`/tweets/${id}`}
          key={id}
          className="bg-secondary w-full cursor-pointer rounded-xl text-secondary-foreground p-4 flex justify-between"
        >
          <section>
            <span className="flex gap-2 items-center">
              <p className="text-blue-400">{username}</p>
              <p className="text-xs text-muted-foreground">d ago</p>
            </span>
            <h2>{tweet}</h2>
          </section>
          <Image src="/welcome.png" alt="welcome" width={50} height={30} />
        </Link>
      ))}
      <FaCirclePlus
        className="cursor-pointer absolute bottom-24 right-16 text-primary hover:scale-125 transition ani"
        size={48}
        onClick={toggleInput}
      />
    </main>
  );
}
