"use client";

import { MdThumbUp, MdOutlineThumbUp } from "react-icons/md";
import { dislikeTweet, likeTweet } from "../app/tweets/[id]/actions";
import { startTransition, useOptimistic } from "react";
import { Button } from "./ui/button";

interface Props {
  count: number;
  isLiked: boolean;
  tweetId: number;
}
export default function LikeButton({ count, isLiked, tweetId }: Props) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, count },
    (prev, _payload) => ({
      isLiked: !prev.isLiked,
      count: prev.isLiked ? prev.count - 1 : prev.count + 1,
    })
  );
  const onClick = async () => {
    startTransition(() => {
      reducerFn(undefined);
    });
    state.isLiked ? await dislikeTweet(tweetId) : await likeTweet(tweetId);
  };
  return (
    <Button
      className="flex w-min min-w-16 gap-1"
      variant={state.isLiked ? "default" : "outline"}
      onClick={onClick}
    >
      {state.isLiked ? <MdThumbUp /> : <MdOutlineThumbUp />}
      <p>{state.count}</p>
    </Button>
  );
}
