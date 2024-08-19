"use client";

import { MdThumbUp, MdOutlineThumbUp } from "react-icons/md";
import { dislikeTweet, likeTweet } from "../tweets/[id]/actions";
import { startTransition, useOptimistic } from "react";

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
    <div
      className={`${
        state.isLiked ? "bg-orange-300" : ""
      } w-24 flex justify-center items-center cursor-pointer border-black border-2 gap-2`}
      onChange={onClick}
    >
      {state.isLiked ? <MdThumbUp /> : <MdOutlineThumbUp />}
      <p>{state.count}</p>
    </div>
  );
}
