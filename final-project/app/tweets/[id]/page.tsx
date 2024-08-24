import { IoMdArrowRoundBack } from "react-icons/io";
import LikeButton from "@/components/like-button";
import getTweet, { getLikesCached, getResponsesCached } from "./actions";
import Responses from "@/components/responses";
import Link from "next/link";
import { BsPostcardHeartFill } from "react-icons/bs";
import Avatar from "@/components/avatar";
import { notFound } from "next/navigation";
import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import Article from "@/components/article";
import TweetContent from "@/components/tweet-content";

export default async function Tweet({ params }: { params: { id: string } }) {
  const tweetId = +params.id;
  const responses = await getResponsesCached(tweetId);
  const tweet = await getTweet(tweetId);
  if (!tweet) {
    notFound();
  }
  return (
    <div className="min-h-screen pb-24">
      <hr className="border-3" />

      <div className="p-4 flex flex-col gap-2">
        <header className="flex items-center gap-4 border-b py-3">
          {/* TODO: it should be go back, with client component */}
          <Link href="/">
            <IoMdArrowRoundBack size={28} className="cursor-pointer" />
          </Link>
          <BsPostcardHeartFill size={28} />
          <h1 className="text-xl font-bold">{tweet.title}</h1>
        </header>
        <TweetContent tweet={tweet} />
      </div>
      <Responses responses={responses} tweetId={tweetId} />
    </div>
  );
}
