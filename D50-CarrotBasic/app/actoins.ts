"use server";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export default async function getTweets(page: number) {
  const tweets = await db.tweet.findMany({
    skip: page * 1,
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  const total = await db.tweet.count();

  return { tweets, total };
}

export type Tweets = Prisma.PromiseReturnType<typeof getTweets>["tweets"];
