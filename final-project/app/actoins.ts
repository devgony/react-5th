"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { z } from "zod";

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

export async function addTweet(prevState: any, formData: FormData) {
  const formSchema = z
    .string()
    .refine((t) => !t.includes("wrong"), "remove keyword: 'wrong'");
  const data = formData.get("tweet");
  const { success, error, data: tweet } = formSchema.safeParse(data);

  if (!success || !tweet) {
    return error?.flatten();
  }

  const session = await getSession();
  const userId = session.id;

  if (!userId) {
    return {
      formErrors: ["You must be logged in to tweet."],
    };
  }

  await db.tweet.create({
    data: {
      tweet,
      userId,
    },
  });
}
