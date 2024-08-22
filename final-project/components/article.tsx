import { formatToTimeAgo } from "@/lib/utils";
import Avatar from "./avatar";

interface Props {
  username: string;
  content: string;
  updated_at: Date;
}

export default function Article({ username, content, updated_at }: Props) {
  return (
    <article className="my-2 flex gap-2">
      <Avatar username={username} />
      <section className="-mt-2">
        <span className="flex gap-2">
          <p className="text-blue-400">{username}</p>
          <p>{formatToTimeAgo(updated_at.toString())}</p>
        </span>
        <p className="break-all text-sm text-muted-foreground">{content}</p>
      </section>
    </article>
  );
}
