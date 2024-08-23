"use server";
import db from "@/lib/db";
import { tweetSchema } from "@/lib/schema";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";
import { z } from "zod";

export default async function getTweets(page: number) {
  const tweets = await db.tweet.findMany({
    // skip: page * 1,
    take: 1,
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      updated_at: "desc",
    },
  });
  const total = await db.tweet.count();

  return { tweets, total };
}

export type Tweets = Prisma.PromiseReturnType<typeof getTweets>["tweets"];

export async function getMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
    skip: page * 1,
    take: 1,
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return tweets;
}

export async function addTweet(formData: FormData) {
  const fdata = {
    title: formData.get("title"),
    content: formData.get("content"),
    photo: formData.get("photo"),
  };
  const { success, error, data } = tweetSchema.safeParse(fdata);
  console.log("formData", success, error, data);

  if (!success || !data) {
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
      ...data,
      userId,
    },
  });
}

export async function getMe() {
  const session = await getSession();
  if (!session.id) {
    console.error("No session found");
    return;
  }

  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
  });

  return user;
}
