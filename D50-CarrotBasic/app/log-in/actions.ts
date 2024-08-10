"use server";

import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const formSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string({
    required_error: "Password is required",
  }),
});

export default async function handleForm(prevState: any, formData: FormData) {
  const fData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { success, error, data } = formSchema.safeParse(fData);
  if (!success || !data) {
    return error.flatten();
  }

  const { email, password } = data;

  const user = await db.user.findUnique({
    where: { email },
    select: { id: true, password: true },
  });

  if (!user) {
    // This fetches user once so more efficient and can handle typeError
    return {
      fieldErrors: {
        password: [],
        email: ["An account with this email does not exist."],
      },
    };
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return {
      fieldErrors: {
        password: ["Wrong password."],
        email: [],
      },
    };
  }

  const session = await getSession();
  session.id = user.id;
  await session.save();

  redirect("/profile");
}
