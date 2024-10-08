import getTweet from "@/app/tweets/[id]/actions";
import TweetContent from "@/components/tweet-content";
import { notFound } from "next/navigation";
import { GrFormNextLink } from "react-icons/gr";
import GoBack from "@/components/go-back";

interface Props {
  params: {
    id: string;
  };
}
export default async function TweetModal({ params: { id } }: Props) {
  const tweet = await getTweet(+id);
  if (!tweet) {
    notFound();
  }
  return (
    <div className="fixed top-0 max-w-xl w-full p-10 h-screen">
      <div className="bg-third rounded-2xl p-4 overflow-y-auto h-3/4">
        <div className="flex justify-between w-full">
          <GoBack />
          <a href={`/tweets/${tweet.id}`}>
            <GrFormNextLink size={32} />
          </a>
        </div>
        <TweetContent tweet={tweet} />
      </div>
    </div>
  );
}
