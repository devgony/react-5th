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
    <div className="bg-third w-full h-screen p-2 overflow-y-scroll">
      <div className="flex gap-2 items-center pr-8">
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
    // <div>
    //   <form action={dispatch} ref={formRef}>
    //     <Input
    //       type="text"
    //       name="keyword"
    //       placeholder="search keyword"
    //       required={false}
    //       errors={state?.formErrors}
    //     />
    //     <FormButton payload="Search" />
    //   </form>
    //   {state?.tweets?.map((t) => {
    //     return (
    //       <div key={t.id}>
    //         <div>{t.content}</div>
    //       </div>
    //     );
    //   })}
    // </div>
  );
}
