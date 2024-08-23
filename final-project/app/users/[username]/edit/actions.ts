"use server";
import db from "@/lib/db";
import { editUserSchema } from "@/lib/schema";
import { User } from "@prisma/client";
import { revalidatePath, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const editUser = async (formData: FormData, prevUser: User) => {
  console.log("editUser");
  console.log("photo", formData.get("photo"));

  const fData = {
    email: formData.get("email"),
    username: formData.get("username"),
    bio: formData.get("bio"),
    photo: formData.get("photo"),
  };
  const { success, error, data } = editUserSchema.safeParse(fData);

  if (!success || !data) {
    console.log("error", error);
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
