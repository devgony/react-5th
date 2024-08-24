"use server";
import db from "@/lib/db";
import { redirect } from "next/navigation";

export const searchUsers = async (keyword: string) => {
  return db.user.findMany({
    where: {
      OR: [
        {
          username: {
            contains: keyword,
          },
        },

        {
          email: {
            contains: keyword,
          },
        },
      ],
    },
  });
};

export const revalidateSearchUsers = (formData: FormData) => {
  const keyword = formData.get("keyword") as string;

  redirect(`/users?keyword=${keyword}`);
};
