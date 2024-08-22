import { getTweetsByUsername, getUserByUsername } from "./actions";
import Link from "next/link";
import getSession from "@/lib/session";

export interface UsernameParams {
  params: {
    username: string;
  };
}

export default async function Profile({
  params: { username },
}: UsernameParams) {
  const user = await getUserByUsername(username);
  const tweets = await getTweetsByUsername(username);
  const session = await getSession();
  return (
    <div>
      <p>{JSON.stringify(user)}</p>
      {tweets.map((t) => (
        <p key={t.id}>{t.tweet}</p>
      ))}

      {user?.id == session?.id && (
        <Link href={`/users/${username}/edit`} className="border border-black">
          Edit profile
        </Link>
      )}
    </div>
  );
}
