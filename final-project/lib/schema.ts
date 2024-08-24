import { z } from "zod";

export const tweetSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1)
    .max(128),
  content: z
    .string({
      required_error: "Content is required",
    })
    .min(1)
    .max(1024),
  photo: z.string().nullish(),
});

export type TweetType = z.infer<typeof tweetSchema>;

export const editUserSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  bio: z.string(),
  photo: z.string().nullish(),
});

export type EditUserType = z.infer<typeof editUserSchema>;
