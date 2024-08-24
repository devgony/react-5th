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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

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
      <main className="flex flex-col gap-2 h-screen relative">
        {showInput && <AddTweet toggleShowInput={toggleShowInput} />}
        <header className="flex justify-between items-center">
          <span className="flex items-center gap-2">
            <BsPostcardHeart className="w-10 h-10" />
            <h1 className="text-lg font-bold">Tweets</h1>
          </span>
          <IoSearch className="w-10 h-10" />
        </header>
        {/* TODO: Select Sort & View */}
        {tweets?.map(({ user: { username }, title, content, id }) => (
          <Link
            href={`/tweets/${id}`}
            key={id}
            className="bg-secondary w-full cursor-pointer rounded-xl text-secondary-foreground p-4 flex justify-between h-48"
          >
            <section className="w-3/4">
              <span className="flex gap-2 items-center">
                <Avatar className="size-12">
                  <AvatarImage src="https://github.com/devgony.png" />
                  <AvatarFallback>avatar</AvatarFallback>
                </Avatar>
                <p className="text-blue-400">{username}</p>
                <p className="text-xs text-muted-foreground">d ago</p>
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
        {!showInput && (
          <FaCirclePlus
            className="cursor-pointer bottom-32 right-8 text-primary hover:scale-125 transition absolute"
            size={48}
            onClick={toggleInput}
          />
        )}
      </main>
    </>
  );
}
