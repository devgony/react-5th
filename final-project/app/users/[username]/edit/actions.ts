"use server";
import db from "@/lib/db";
import { editUserSchema, EditUserType, passwordSchema } from "@/lib/schema";
import { User } from "@prisma/client";
import { revalidatePath, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

export const editUser = async (formData: FormData, prevUser: User) => {
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

  const updatedData = await Object.entries(data).reduce(
    async (accPromise, [key, value]) => {
      const acc = await accPromise;

      if (value && value !== prevUser[key as keyof typeof prevUser]) {
        acc[key as keyof EditUserType] = value;
      }

      return acc;
    },
    Promise.resolve({} as EditUserType)
  );

  await db.user.update({
    data: updatedData,
    where: {
      id: prevUser.id,
    },
  });

  revalidatePath(`/users/${data.username}/edit`);
  redirect(`/users/${data.username}`);
};

export const editUserCached = (formData: FormData, prevUser: User) =>
  unstable_cache(editUser, ["edit-user"], {
    tags: [`edit-user-${formData.get("username")}`],
  })(formData, prevUser);

export const changePassword = async (formData: FormData, userId: number) => {
  const password = formData.get("password");
  const confirm = formData.get("confirm");

  const d = {
    password,
    confirm,
  };

  const { success, error, data } = passwordSchema.safeParse(d);

  if (!success || !data) {
    return error.flatten();
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  await db.user.update({
    data: { password: hashedPassword },
    where: {
      id: userId,
    },
  });
};
