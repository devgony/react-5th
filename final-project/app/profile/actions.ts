import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";

export async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export async function getTweetsByUserId(id: number) {
  return await db.tweet.findMany({
    include: {
      user: true,
    },
    where: {
      user: {
        id,
      },
    },
  });
}
