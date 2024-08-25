import { IoMdArrowRoundBack } from "react-icons/io";
import LikeButton from "@/components/like-button";
import getTweet, {
  deleteTweet,
  getLikesCached,
  getResponsesCached,
  getTweetCached,
} from "./actions";
import Responses from "@/components/responses";
import Link from "next/link";
import { BsPostcardHeartFill } from "react-icons/bs";
import Avatar from "@/components/avatar";
import { notFound } from "next/navigation";
import { dw, formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import TweetContent from "@/components/tweet-content";
import { Button } from "@/components/ui/button";
import EditTweet from "@/components/edit-tweet";
import GoBack from "@/components/go-back";
import getSession from "@/lib/session";

export default async function Tweet({ params }: { params: { id: string } }) {
  await dw();
  const tweetId = +params.id;
  const responses = await getResponsesCached(tweetId);
  const tweet = await getTweetCached(tweetId);
  if (!tweet) {
    notFound();
  }
  const session = await getSession();
  return (
    <div className="min-h-screen pb-24">
      <hr className="border-3" />

      <div className="p-4 flex flex-col gap-2 w-full">
        <header className="flex items-center gap-4 border-b py-3 justify-between w-full">
          {/* TODO: it should be go back, with client component */}
          <div className="flex gap-2">
            {/* <Link href="/">
              <IoMdArrowRoundBack size={28} className="cursor-pointer" />
            </Link> */}
            <GoBack variant="arrow" />
            <BsPostcardHeartFill size={28} />
            <h1 className="text-xl font-bold">{tweet.title}</h1>
          </div>
          {session.id === tweet.userId && (
            <form
              action={async () => {
                "use server";
                return deleteTweet(tweetId);
              }}
            >
              <Button variant="ghost">Delete</Button>
            </form>
          )}
        </header>
        <TweetContent tweet={tweet} />
      </div>
      <Responses responses={responses} tweetId={tweetId} />
    </div>
  );
}
