"use server";
import db from "@/lib/db";

export const searchTweets = async (keyword: string) => {
  return db.tweet.findMany({
    include: {
      user: true,
    },
    where: {
      OR: [
        {
          title: {
            contains: keyword,
          },
        },
        {
          content: {
            contains: keyword,
          },
        },
        {
          user: {
            username: {
              contains: keyword,
            },
          },
        },
      ],
    },
    orderBy: {
      updated_at: "desc",
    },
  });
};
