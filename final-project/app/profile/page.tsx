import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";
import ProfileCard from "@/components/profile-card";

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

export default async function Profile() {
  const user = await getUser();
  return <ProfileCard user={user} />;
}
