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
import Search from "@/app/search/page";

export default function SearchModal() {
  return (
    <div className="fixed top-0 pl-10 max-w-xl w-full">
      <SlideInRight>
        <Search />
      </SlideInRight>
    </div>
  );
}
