import { z } from "zod";

export const tweetSchema = z.object({
  title: z
    .string({
      required_error: "Title is required and must be less than 128 characters",
    })
    .min(1)
    .max(128),
  content: z
    .string({
      required_error:
        "Content is required and must be less than 1024 characters",
    })
    .min(1)
    .max(1024),
  photo: z.string().nullish(),
});

export type TweetType = z.infer<typeof tweetSchema>;

export const editUserSchema = z.object({
  email: z.string().email().nullish(),
  username: z.string(),
  bio: z.string(),
  photo: z.string().nullish(),
});

export type EditUserType = z.infer<typeof editUserSchema>;

export const passwordSchema = z
  .object({
    password: z.string().min(6),
    confirm: z.string(),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: "Passwords must match",
    path: ["confirm"], // This will show the error message under the confirm field
  });

export type PasswordType = z.infer<typeof passwordSchema>;
