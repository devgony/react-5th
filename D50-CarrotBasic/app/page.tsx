import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <h1>Home</h1>
      <Link href="/create-account">Create account</Link>
      <Link href="/log-in">Login</Link>
    </div>
  );
}
