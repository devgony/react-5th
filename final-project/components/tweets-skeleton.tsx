import Avatar from "@/components/avatar";
import { BsPostcardHeart } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";

export default function TweetsSkeleton() {
  return (
    <main className="flex min-h-screen flex-col gap-2 p-4 animate-pulse">
      <header className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <BsPostcardHeart className="h-10 w-10" />
          <h1 className="text-lg font-bold">Tweets</h1>
        </span>
        <IoSearch size={36} />
      </header>
      <div className="flex h-48 w-full cursor-pointer justify-between rounded-xl bg-secondary p-4 text-secondary-foreground my-2">
        <section className="flex w-3/4 flex-col gap-2">
          <span className="flex items-center gap-2">
            <Avatar username="" src={"yy"} />
            <div className="w-24 bg-neutral-700 h-5" />
          </span>
          <div className="w-20 bg-neutral-700 h-5" />
          <div className="w-60 bg-neutral-700 h-5" />
          <div className="w-60 bg-neutral-700 h-5" />
        </section>
      </div>
    </main>
  );
}
