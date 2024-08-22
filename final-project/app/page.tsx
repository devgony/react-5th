"use client";
import getTweets, { Tweets } from "./actoins";
import { useEffect, useState } from "react";
import AddTweet from "../components/add-tweet";
import { BsPostcardHeart } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
import TweetList from "@/components/tweet-list";

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

  const [showInput, toggleShowInput] = useState(false);

  const toggleInput = () => {
    toggleShowInput(!showInput);
  };
  return (
    <>
      <main className="flex flex-col gap-2 min-h-screen">
        {showInput && <AddTweet toggleShowInput={toggleShowInput} />}
        <header className="flex justify-between items-center">
          <span className="flex items-center gap-2">
            <BsPostcardHeart className="w-10 h-10" />
            <h1 className="text-lg font-bold">Tweets</h1>
          </span>
          <IoSearch className="w-10 h-10" />
        </header>
        {/* TODO: Select Sort & View */}
        {tweets && <TweetList initTweets={tweets} />}
        <div className="my-1" />
        {!showInput && (
          // TODO: why right-8 is not working?
          <FaCirclePlus
            className="cursor-pointer bottom-32 right-8 text-primary hover:scale-125 transition sticky"
            size={48}
            onClick={toggleInput}
          />
        )}
      </main>
    </>
  );
}
