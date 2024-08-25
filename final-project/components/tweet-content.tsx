import Link from "next/link";
import { BsPostcardHeartFill } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";
import Article from "./article";
import LikeButton from "./like-button";
import Image from "next/image";
import { Tweet } from "@prisma/client";
import getTweet, { getLikesCached, GetTweet } from "@/app/tweets/[id]/actions";
import { notFound } from "next/navigation";

interface Props {
  tweet: Exclude<GetTweet, null>;
}
export default async function TweetContent({ tweet }: Props) {
  const {
    id,
    title,
    content,
    updated_at,
    user: { username, photo, id: userId },
  } = tweet;
  const { count, isLiked } = await getLikesCached(id);
  return (
    <>
      <Article
        id={id}
        userId={userId}
        type="tweet"
        photo={photo}
        content={content}
        updated_at={updated_at}
        username={username}
      />
      {photo && (
        <div className="min-h-96 w-11/12 relative m-5 mx-auto">
          <Image className="object-contain" fill src={photo} alt={photo} />
        </div>
      )}
      <hr className="my-4" />
      <LikeButton count={count} isLiked={isLiked} tweetId={id} />
    </>
  );
}
