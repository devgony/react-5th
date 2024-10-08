import getSession from "@/lib/session";
import Avatar from "./avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import { FaPencilAlt } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";
import UserTweets from "./user-tweets";

async function logOut() {
  "use server";
  const session = await getSession();
  session.destroy();

  redirect("/");
}

interface Props {
  user: User;
}
export default async function ProfileCard({ user }: Props) {
  const session = await getSession();
  return (
    <>
      <section className="h-36 bg-primary/50" />
      <div className="absolute -mt-8 rounded-full bg-background p-1">
        <Avatar
          username={user.username}
          size="md"
          src={user.photo}
          link={false}
        />
      </div>
      <div className="px-4 mt-12">
        <section className="rounded-xl bg-secondary p-4 flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-secondary-foreground">
            {user.username}
          </h1>
          <h2>{user.email}</h2>
          <label className="text-xs text-muted-foreground mt-4">
            Abount me
          </label>
          <p>{user.bio}</p>
          {user?.id == session?.id && (
            <div className="flex justify-around mt-8">
              <Link href={`/users/${user.username}/edit`}>
                <Button className="w-36 bg-third">
                  <FaPencilAlt className="mr-2" />
                  Edit Profile
                </Button>
              </Link>
              <form action={logOut} className="w-36">
                <Button className="w-full bg-third">
                  <RiLogoutBoxRLine className="mr-2" size={20} />
                  Logout
                </Button>
              </form>
            </div>
          )}
        </section>
        <section className="my-4 rounded-xl bg-secondary p-4 flex flex-col">
          <p>Xcode Member since</p>
          <p>
            {user.created_at.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </section>
        <hr className="mb-4" />
        <UserTweets id={user.id} />
        <div className="pb-24" />
      </div>
    </>
  );
}
