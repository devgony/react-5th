"use client";
import { formatToTimeAgo } from "@/lib/utils";
import Avatar from "./avatar";
import { PiPencilCircleFill } from "react-icons/pi";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  editResponseContent,
  editTweetContent,
} from "@/app/tweets/[id]/actions";
import { getMe } from "@/app/actions";
import { useRecoilValue } from "recoil";
import { meState } from "@/lib/atoms";

interface Props {
  username: string;
  photo: string | null;
  content: string;
  updated_at: Date;
  id: number; // id of tweet of response
  type: "tweet" | "response";
  userId: number;
}

export default function Article({
  username,
  content,
  updated_at,
  photo,
  id,
  type,
  userId,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const me = useRecoilValue(meState);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    console.log(event.keyCode);
    if (event.keyCode === 13) {
      event.preventDefault();
      const target = event.target as HTMLTextAreaElement;
      if (target.form) {
        target.form.requestSubmit();
      }
    }

    if (event.keyCode === 27) {
      event.preventDefault();
      setIsEditing(false);
    }
  };
  return (
    <>
      <article className="my-2 flex gap-2 hover:bg-secondary px-2 py-4 rounded-xl relative group">
        {me?.id === userId && (
          <FaPencilAlt
            className="text-muted-foreground group-hover:block hidden absolute right-2 top-2 hover:text-secondary-foreground cursor-pointer"
            onClick={() => setIsEditing((prev) => !prev)}
            size={16}
          />
        )}
        <Avatar username={username} src={photo} />
        <section className="-mt-2 w-full">
          <span className="flex gap-2">
            <p className="text-blue-400">{username}</p>
            <p>{formatToTimeAgo(updated_at.toString())}</p>
          </span>

          {isEditing ? (
            <form
              className="w-full"
              action={async (formData: FormData) => {
                if (me?.id !== userId) {
                  alert("You can't edit other's content");
                  return;
                }

                if (type === "response") {
                  await editResponseContent(formData, id);
                } else if (type === "tweet") {
                  console.log("tweet", id);
                  await editTweetContent(formData, id);
                }

                setIsEditing(false);
              }}
            >
              <textarea
                name="content"
                className="w-full p-2 rounded-xl bg-third text-third-foreground resize-none text-sm"
                defaultValue={content}
                rows={5}
                onKeyDown={handleKeyDown}
              />
              <p className="text-xs my-0">
                escape to
                <Button
                  type="button"
                  className="text-xs text-blue-400 p-1 h-1"
                  variant="link"
                  onClick={() => setIsEditing(false)}
                >
                  cancle
                </Button>
                •
                <Button
                  type="submit"
                  className="text-xs text-blue-400 p-1 h-1"
                  variant="link"
                >
                  enter
                </Button>
                to save
              </p>
            </form>
          ) : (
            <p className="break-all text-sm text-muted-foreground">{content}</p>
          )}
        </section>
      </article>
    </>
  );
}
