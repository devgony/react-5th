import AddTweet from "../components/add-tweet";
import { BsPostcardHeart } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import TweetListInifiteScroll from "@/components/tweet-list-infinite-scroll";
import { getInitTweetsCached } from "./actions";
import Link from "next/link";

export default async function Home() {
  const tweets = await getInitTweetsCached();
  return (
    <main className="flex min-h-screen flex-col gap-2 p-4 pb-20">
      <header className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <BsPostcardHeart className="h-10 w-10" />
          <h1 className="text-lg font-bold">Tweets</h1>
        </span>
        <Link href="/search">
          <IoSearch size={36} />
        </Link>
      </header>
      <TweetListInifiteScroll initTweets={tweets} />
      <AddTweet />
    </main>
  );
}
