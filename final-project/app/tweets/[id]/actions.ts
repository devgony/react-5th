"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { z } from "zod";
import { revalidateTag, unstable_cache } from "next/cache";
import { Prisma } from "@prisma/client";

export default async function getTweet(id: number) {
  return db.tweet.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
}
export type GetTweet = Prisma.PromiseReturnType<typeof getTweet>;

export async function getResponses(tweetId: number) {
  return db.response.findMany({
    where: {
      tweetId,
    },
    include: {
      user: {
        select: {
          username: true,
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
