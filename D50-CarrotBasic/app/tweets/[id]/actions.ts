import db from "@/lib/db";

export default function getTweet(id: number) {
  return db.tweet.findUnique({ where: { id } });
}
