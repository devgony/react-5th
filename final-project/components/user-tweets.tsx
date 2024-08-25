import { getTweetsByUserId } from "@/app/profile/actions";
import TweetListInifiteScroll from "./tweet-list-infinite-scroll";
import TweetList from "./tweet-list";

interface Props {
  id: number;
}
export default async function UserTweets({ id }: Props) {
  const tweets = await getTweetsByUserId(id);
  return (
    <>
      <TweetList tweets={tweets} />
    </>
  );
}
