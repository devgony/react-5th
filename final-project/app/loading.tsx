"use client";
import Loading from "@/components/loading";
import TweetsSkeleton from "@/components/tweets-skeleton";
import { usePathname } from "next/navigation";

export default function GlobalLoading() {
  const path = usePathname();

  if (path === "/") {
    return <TweetsSkeleton />;
  }

  return <Loading />;
}
