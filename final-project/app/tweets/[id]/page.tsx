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

export default async function Tweet({ params }: { params: { id: string } }) {
  const tweetId = +params.id;
  const tweet = await getTweet(tweetId);
  if (!tweet) {
    notFound();
  }
  const {
    title,
    content,
    photo,
    updated_at,
    user: { username },
  } = tweet;
  const responses = await getResponsesCached(tweetId);
  const { count, isLiked } = await getLikesCached(tweetId);
  return (
    <div className="flex min-h-screen flex-col gap-2">
      <header className="flex items-center gap-4 border-b py-3">
        {/* TODO: it should be go back, with client component */}
        <Link href="/">
          <IoMdArrowRoundBack size={28} className="cursor-pointer" />
        </Link>
        <BsPostcardHeartFill size={28} />
        <h1 className="text-xl font-bold">{title}</h1>
      </header>
      <BsPostcardHeartFill
        size={64}
        className="rounded-full bg-secondary p-2"
      />
      <h1 className="text-3xl font-bold">{title}</h1>
      <Article content={content} updated_at={updated_at} username={username} />
      {photo && (
        <Image
          className="mx-auto"
          src={photo + "/public"}
          alt="tweet"
          width={400}
          height={400}
        />
      )}
      <hr />
      <LikeButton count={count} isLiked={isLiked} tweetId={tweetId} />
      <hr className="border-4" />
      <Responses responses={responses} tweetId={tweetId} />
    </div>
  );
}
