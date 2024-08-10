import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
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

async function logOut() {
  "use server";
  const session = await getSession();
  session.destroy();

  redirect("/");
}

export default async function Profile() {
  const user = await getUser();
  return (
    <div>
      <h1>Profile</h1>
      {Object.entries(user).map(([k, v]) => (
        <div key={k} className="flex gap-2">
          <p>{k}</p>
          <p>{v?.toString()}</p>
        </div>
      ))}
      <form action={logOut}>
        <button>Logout</button>
      </form>
    </div>
  );
}
