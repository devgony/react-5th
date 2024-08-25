import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";
import ProfileCard from "@/components/profile-card";
import { getUser } from "./actions";

export default async function Profile() {
  const user = await getUser();
  return <ProfileCard user={user} />;
}
