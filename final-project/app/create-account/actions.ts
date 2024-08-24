"use server";

import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkUniqueUsername = async (
  { username }: z.infer<typeof formSchema>,
  ctx: z.RefinementCtx
) => {
  const user = await db.user.findUnique({
    where: { username },
    select: { id: true },
  });
  if (user) {
    ctx.addIssue({
      code: "custom",
      message: "Username already exists",
      path: ["username"],
      fatal: true,
    });

    return z.NEVER;
  }
};
const checkUniqueEmail = async (
  { email }: z.infer<typeof formSchema>,
  ctx: z.RefinementCtx
) => {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  if (user) {
    ctx.addIssue({
      code: "custom",
      message: "Email already exists",
      path: ["email"],
      fatal: true,
    });

    return z.NEVER;
  }
};

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

const superRefinedSchema = formSchema
  .superRefine(checkUniqueUsername)
  .superRefine(checkUniqueEmail);

export default async function createAccount(
  prevState: any,
  formData: FormData
) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = await superRefinedSchema.spa(data);
  if (!result.success) {
    const error = result.error.flatten();
    console.log(error);

    return error;
  }

  const password = await bcrypt.hash(result.data.password, 12);
  const { username, email } = result.data;
  const user = await db.user.create({
    data: {
      username,
      email,
      password,
    },
    select: {
      id: true,
    },
  });

  const session = await getSession();
  session.id = user.id;
  await session.save();

  redirect("/profile");
}
