import { Button } from "@/components/ui/button";
import Image from "next/image";
import welcomePic from "@/public/welcome.png";
import Link from "next/link";

export default function Welcome() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-2xl font-bold">Discord</h1>
      <Image src={welcomePic} width={400} alt="Discord logo" />
      <h2 className="text-xl">Welcome to Discord</h2>
      <p className="px-12 text-muted-foreground">
        Join over 100 million people who use Discord to talk with communities
        and friends.
      </p>
      <Link href="/create-account" className="w-full">
        <Button className="w-full">Register email</Button>
      </Link>
      <Link href="/github/start" className="w-full">
        <Button className="w-full" variant="outline">
          Sign in github
        </Button>
      </Link>
      <Link href="/log-in" className="w-full">
        <Button className="w-full" variant={"secondary"}>
          Log In
        </Button>
      </Link>
    </main>
  );
}
