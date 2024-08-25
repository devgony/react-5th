"use client";
import { useFormState } from "react-dom";
import FormButton from "../../components/form-button";
import Input from "../../components/input";
import { searchTweets } from "./actions";
import { useEffect, useRef, useState } from "react";
import { Tweets } from "../actions";
import { Button } from "@/components/ui/button";
import TweetList from "@/components/tweet-list";
import GoBack from "@/components/go-back";
import { GrFormPreviousLink } from "react-icons/gr";
import { SlideInRight } from "@/components/framer/slide-in-right";
import { PageTransitionLayout } from "@/layouts/PageTransitionLayout";

export default function Search() {
  // const [state, dispatch] = useFormState(searchTweets, null);
  // const formRef = useRef<HTMLFormElement>(null);
  // useEffect(() => {
  //   dispatch(new FormData(formRef.current!));
  // }, [dispatch]);
  const [tweets, setTweets] = useState<Tweets>([]);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    searchTweets(keyword).then((tweets) => {
      setTweets(tweets);
    });
  }, [keyword]);
  return (
    <PageTransitionLayout>
      <div className="bg-second w-full h-screen p-2">
        <div className="flex gap-2 items-center pr-8">
          {/* <a href="/" className="text-2xl text-primary-foreground">
          <GrFormPreviousLink className="cursor-pointer" size={32} />
        </a> */}
          <GoBack variant="arrow" />
          <Input
            className="bg-background"
            placeholder="Search"
            name="keyword"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            required={false}
          />
        </div>
        <TweetList tweets={tweets} />
      </div>
    </PageTransitionLayout>
  );
}
