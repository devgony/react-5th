"use server";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { z } from "zod";

export const getUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({ where: { username } });
  if (!user) {
    notFound();
  }
  return user;
};

export const getUserByUsernameCached = (username: string) =>
  unstable_cache(getUserByUsername, ["get-user-by-username"])(username);

export type User = Prisma.PromiseReturnType<typeof getUserByUsername>;

export const getTweetsByUsername = (username: string) => {
  return db.tweet.findMany({ where: { user: { username } } });
};
