import { getTweetsByUsername, getUserByUsername } from "./actions";
import Link from "next/link";
import getSession from "@/lib/session";
import Avatar from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { FaPencilAlt } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { redirect } from "next/navigation";
import ProfileCard from "@/components/profile-card";

async function logOut() {
  "use server";
  const session = await getSession();
  session.destroy();

  redirect("/");
}

export interface UsernameParams {
  params: {
    username: string;
  };
}

export default async function UserDetail({
  params: { username },
}: UsernameParams) {
  const user = await getUserByUsername(username);
  const tweets = await getTweetsByUsername(username);
  const session = await getSession();
  return (
    <>
      <ProfileCard user={user} />
      {/* tweets */}
    </>
  );
}
