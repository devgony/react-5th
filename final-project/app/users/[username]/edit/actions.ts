"use server";
import db from "@/lib/db";
import { User } from "@prisma/client";
import { revalidatePath, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const editUser = async (formData: FormData, prevUser: User) => {
  const schema = z.object({
    email: z.string().email(),
    username: z.string(),
    bio: z.string(),
  });
  const fData = {
    email: formData.get("email"),
    username: formData.get("username"),
    bio: formData.get("bio"),
  };
  const { success, error, data } = schema.safeParse(fData);

  if (!success || !data) {
    return error.flatten();
  }

  await db.user.update({
    data,
    where: {
      id: prevUser.id,
    },
  });

  if (data.username != prevUser.username) {
    console.log("here");
    redirect(`/users/${data.username}/edit`);
  }

  console.log("there");
  revalidatePath(`/users/${data.username}/edit`);
};

export const editUserCached = (formData: FormData, prevUser: User) =>
  unstable_cache(editUser, ["edit-user"], {
    tags: [`edit-user-${formData.get("username")}`],
  })(formData, prevUser);
