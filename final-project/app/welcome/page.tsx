import { Button } from "@/components/ui/button";
import Image from "next/image";
import welcomePic from "@/public/welcome.png";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Welcome() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4 px-4">
      <FaDiscord className="text-5xl animate-loading" />
      <span className="flex items-center">
        <FaXTwitter className="text-2xl" />
        <h1 className="text-2xl font-bold">cord</h1>
      </span>
      <Image src={welcomePic} width={400} alt="Xcord logo" />
      <h2 className="text-xl">Welcome to Xcord</h2>
      <p className="px-12 text-muted-foreground">
        Join over 100 million people who use Xcord to talk with communities and
        friends.
      </p>
      <Link href="/github/start" className="w-full">
        <Button className="w-full">Sign in github</Button>
      </Link>
      <Link href="/create-account" className="w-full">
        <Button className="w-full" variant="secondary">
          Register email
        </Button>
      </Link>
      <Link href="/log-in" className="w-full">
        <Button className="w-full" variant={"outline"}>
          Log In
        </Button>
      </Link>
    </main>
  );
}
