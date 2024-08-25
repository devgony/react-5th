"use server";
import db from "@/lib/db";
import { tweetSchema } from "@/lib/schema";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

async function getInitTweets() {
  return await db.tweet.findMany({
    take: 1,
    include: {
      user: {
        select: {
          username: true,
          photo: true,
        },
      },
    },
    orderBy: {
      updated_at: "desc",
    },
  });
}

export type Tweets = Prisma.PromiseReturnType<typeof getInitTweets>;

export const getInitTweetsCached = unstable_cache(
  getInitTweets,
  ["get-init-tweets"],
  {
    tags: ["get-init-tweets", "tweet"],
  }
);

export async function getMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
    skip: page * 1,
    take: 1,
    include: {
      user: {
        select: {
          username: true,
          photo: true,
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

  const ret = await db.tweet.create({
    data: {
      ...data,
      userId,
    },
  });

  // revalidateTag("tweet");
  revalidatePath("/");

  redirect(`/tweets/${ret.id}`);
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
