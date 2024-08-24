"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export const searchUsers = async (keyword: string) => {
  const session = await getSession();
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
      AND: {
        NOT: {
          id: session.id,
        },
      },
    },
  });
};

export const revalidateSearchUsers = (formData: FormData) => {
  const keyword = formData.get("keyword") as string;

  redirect(`/users?keyword=${keyword}`);
};
