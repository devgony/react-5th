"use server";

import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine(
      (email) => email.endsWith("@zod.com"),
      "Email must end with @zod.com"
    ),
  username: z.string().min(5, "Username must be at least 5 characters"),
  password: z.string().min(10).regex(/[0-9]/, "Password must contain a number"),
});

export default async function handleForm(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);

  return {
    logined: result.success,
    ...result.error?.flatten(),
  };
}
