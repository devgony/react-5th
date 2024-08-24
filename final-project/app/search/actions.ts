"use server";
import db from "@/lib/db";
import { z } from "zod";

export const searchTweets = async (_: any, formData: FormData) => {
  const schema = z.optional(z.string());
  const keyword = formData.get("keyword");
  console.log(">" + keyword + "<");
  const { success, error, data: startsWith } = schema.safeParse(keyword);
  if (!success || startsWith == undefined) {
    return {
      formErrors: ["Invalid keyword"],
    };
  }

  const where = {
    where: {
      content: {
        startsWith,
      },
    },
  };
  const tweets = await db.tweet.findMany(where);

  return {
    tweets,
    formErrors: [],
  };
};
