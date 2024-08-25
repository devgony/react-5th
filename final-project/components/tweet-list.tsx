import { Tweets } from "@/app/actions";
import Link from "next/link";
import { useState } from "react";
import Avatar from "./avatar";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

interface Props {
  tweets: Tweets;
}
export default function TweetList({ tweets }: Props) {
  return (
    <div className="flex flex-col gap-2 my-2">
      {tweets?.map(
        ({
          user: { username, photo: profilePhoto },
          title,
          content,
          id,
          updated_at,
          photo,
        }) => (
          <Link
            href={`/tweets/${id}`}
            key={`tweet-${id}`}
            className="flex h-48 w-full cursor-pointer justify-between rounded-xl bg-secondary p-4 text-secondary-foreground"
          >
            <section className="flex w-3/4 flex-col gap-2">
              <span className="flex items-center gap-2">
                <Avatar username={username} src={profilePhoto} />
                <p className="text-blue-400">{username}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(updated_at.toString())}
                </p>
              </span>
              <h2 className="text-xl font-bold">{title}</h2>
              <h3 className="line-clamp-3 text-sm text-muted-foreground">
                {content}
              </h3>
            </section>
            {photo && (
              <div className="flex-1 relative m-5">
                <Image
                  className="size-24 object-cover"
                  fill
                  src={photo}
                  alt={photo}
                />
              </div>
            )}
          </Link>
        )
      )}
    </div>
  );
}
