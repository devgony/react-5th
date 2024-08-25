"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { z } from "zod";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function getTweet(id: number) {
  return db.tweet.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
}
export type GetTweet = Prisma.PromiseReturnType<typeof getTweet>;

export const getTweetCached = unstable_cache(getTweet, ["get-tweet"], {
  tags: ["get-tweet"],
});

export async function getResponses(tweetId: number) {
  return db.response.findMany({
    where: {
      tweetId,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          photo: true,
        },
      },
    },
  });
}

export type ResponsesType = Prisma.PromiseReturnType<typeof getResponses>;

export const getResponsesCached = unstable_cache(
  getResponses,
  ["get-responses"],
  {
    tags: ["get-responses"],
  }
);

export async function getLikes(tweetId: number) {
  const session = await getSession();
  const count = await db.like.count({ where: { tweetId } });
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId: session.id!,
      },
    },
  });

  return { count, isLiked: Boolean(isLiked) };
}

export const getLikesCached = (tweetId: number) =>
  unstable_cache(getLikes, [`get-likes`], {
    tags: [`get-likes-${tweetId}`],
  })(tweetId);

export async function createResponse(
  prevState: any,
  formData: FormData,
  tweetId: number
) {
  const schema = z
    .string()
    .refine((x) => !x.includes("wrong"), "remove keyword: 'wrong'");
  const data = formData.get("response");
  const { success, error, data: payload } = schema.safeParse(data);

  if (!success || !payload) {
    return error?.flatten();
  }

  const session = await getSession();
  const userId = session.id!;

  await db.response.create({
    data: {
      userId,
      tweetId,
      payload,
    },
  });

  revalidateTag("get-responses");
}

export async function likeTweet(tweetId: number) {
  const session = await getSession();
  const userId = session.id!;

  await db.like.create({
    data: {
      userId,
      tweetId,
    },
  });

  revalidateTag(`get-likes-${tweetId}`);
}

export async function dislikeTweet(tweetId: number) {
  const session = await getSession();
  const userId = session.id!;

  await db.like.delete({
    where: {
      id: {
        userId,
        tweetId,
      },
    },
  });

  revalidateTag(`get-likes-${tweetId}`);
}

export const editTweetContent = async (formData: FormData, tweetId: number) => {
  const schema = z.string();
  const data = formData.get("content");
  const { success, error, data: payload } = schema.safeParse(data);

  if (!success || !payload) {
    return error?.flatten();
  }

  await db.tweet.update({
    where: { id: tweetId },
    data: {
      content: payload,
    },
  });

  revalidatePath(`/tweets/${tweetId}`);
};

export const editResponseContent = async (formData: FormData, id: number) => {
  const schema = z.string();
  const data = formData.get("content");
  const { success, error, data: payload } = schema.safeParse(data);

  if (!success || !payload) {
    return error?.flatten();
  }

  const res = await db.response.update({
    where: { id },
    data: {
      payload,
    },
  });

  revalidatePath(`/tweets/${res.tweetId}`);
};

export const deleteTweet = async (tweetId: number) => {
  await db.tweet.delete({
    where: { id: tweetId },
  });

  revalidatePath("/");
  redirect("/");
};
