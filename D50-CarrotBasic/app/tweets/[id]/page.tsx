import getTweet from "./actions";

export default async function Tweet({ params }: { params: { id: string } }) {
  const tweet = await getTweet(+params.id);
  return <div>{JSON.stringify(tweet)}</div>;
}
