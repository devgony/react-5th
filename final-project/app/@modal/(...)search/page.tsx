"use client";
import { SlideInRight } from "@/components/framer/slide-in-right";
import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";
import { searchTweets } from "./actions";
import Image from "next/image";
import TweetListInifiteScroll from "@/components/tweet-list-infinite-scroll";
import { useEffect, useState } from "react";
import { Tweet } from "@prisma/client";
import { TweetType } from "@/lib/schema";
import { Tweets } from "@/app/actions";
import TweetList from "@/components/tweet-list";

export default function SearchModal() {
  const [tweets, setTweets] = useState<Tweets>([]);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    searchTweets(keyword).then((tweets) => {
      setTweets(tweets);
    });
  }, [keyword]);
  return (
    <div className="absolute top-0 pl-10 max-w-xl w-full">
      <SlideInRight>
        <div className="bg-third w-full h-screen p-2 overflow-y-scroll">
          <div className="flex">
            <Input
              className="bg-background"
              placeholder="Search"
              name="keyword"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              required={false}
            />
            <a href="/">
              <Button variant="ghost">Cancel</Button>
            </a>
          </div>
          <TweetList tweets={tweets} />
        </div>
      </SlideInRight>
    </div>
  );
}
