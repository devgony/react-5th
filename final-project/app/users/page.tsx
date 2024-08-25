"use server";
import Input from "@/components/input";
import { PiUsersFill } from "react-icons/pi";
import { revalidateSearchUsers, searchUsers } from "./action";
import { notFound } from "next/navigation";
import Avatar from "@/components/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createOrEnterChatRoom } from "../chat-rooms/actions";
import { FromBottom } from "@/layouts/from-bottom";
import { FromRight } from "@/layouts/from-right";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}
export default async function Users({ searchParams }: Props) {
  const keyword = searchParams["keyword"];
  if (
    Array.isArray(keyword) ||
    (Object.keys(searchParams).length > 1 && typeof keyword != "string")
  ) {
    notFound();
  }
  const users = await searchUsers(keyword ?? "");
  return (
    <main className="flex min-h-screen flex-col gap-4 p-4 pb-24">
      <header className="flex gap-2 items-center">
        <PiUsersFill className="h-10 w-10" />
        <h1 className="text-lg font-bold">Users</h1>
      </header>
      <form className="flex gap-2" action={revalidateSearchUsers}>
        <Input
          className="bg-background"
          placeholder="Put username or email and hit button"
          name="keyword"
          type="text"
          required={false}
        />
        <Button type="submit">Search</Button>
      </form>
      {users.map(({ id, email, username, photo }) => (
        <article
          key={username}
          className="flex bg-third rounded-2xl p-4 justify-between"
        >
          <span className="flex gap-4">
            <Avatar src={photo} username={username} />
            <div>
              <h2 className="text-lg">{username}</h2>
              <p className="text-sm">{email}</p>
            </div>
          </span>
          <span className="flex gap-2">
            <form
              action={async () => {
                "use server";
                return await createOrEnterChatRoom(id);
              }}
            >
              <Button type="submit" variant="secondary">
                Message
              </Button>
            </form>
            <Link href={`/users/${username}`}>
              <Button variant="secondary">Profile</Button>
            </Link>
          </span>
        </article>
      ))}
    </main>
  );
}
