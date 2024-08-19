import LikeButton from "@/app/components/like-button";
import getTweet, { getLikesCached, getResponsesCached } from "./actions";
import Responses from "@/app/components/responses";

export default async function Tweet({ params }: { params: { id: string } }) {
  const tweetId = +params.id;
  const tweet = await getTweet(tweetId);
  const responses = await getResponsesCached(tweetId);
  const { count, isLiked } = await getLikesCached(tweetId);
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold">Tweet</h1>
      <p>{tweet?.tweet}</p>
      <p>{tweet?.userId}</p>
      <p>{tweet?.created_at.toString()}</p>
      <LikeButton count={count} isLiked={isLiked} tweetId={tweetId} />
      <hr />
      <Responses responses={responses} tweetId={tweetId} />
    </div>
  );
}
