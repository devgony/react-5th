"use client";

import Link from "next/link";
import { TbMessageCircle, TbMessageCircleFilled } from "react-icons/tb";
import { usePathname } from "next/navigation";
import { MdOutlineHomeWork, MdHomeWork } from "react-icons/md";
import { ModeToggle } from "./mode-toggle";
import { BsPostcardHeart, BsPostcardHeartFill } from "react-icons/bs";
import { User } from "@prisma/client";
import { meState } from "@/lib/atoms";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import path from "path";
import Avatar from "./avatar";
import { PiUsersFill, PiUsers } from "react-icons/pi";

interface Props {
  me: User;
}
export default function BottomBar({ me }: Props) {
  const pathname = usePathname();
  const [_, setMe] = useRecoilState(meState);
  useEffect(() => {
    setMe(me);
  }, [me, setMe]);
  return (
    <div className="fixed bottom-0 flex w-full max-w-xl justify-around border-t border-muted-foreground bg-secondary py-3 items-center">
      <Link href="/" className="flex flex-col items-center gap-px">
        {pathname === "/" ? (
          <BsPostcardHeartFill className="h-7 w-7" />
        ) : (
          <BsPostcardHeart className="h-7 w-7" />
        )}
        <p className="text-xs">Tweets</p>
      </Link>

      <Link href="/users" className="flex flex-col items-center gap-px">
        {pathname === "/users" ? (
          <PiUsersFill className="h-7 w-7" />
        ) : (
          <PiUsers className="h-7 w-7" />
        )}
        <p className="text-xs">Users</p>
      </Link>

      <Link href="/chat-rooms" className="flex flex-col items-center gap-px">
        {pathname === "/chat-rooms" ? (
          <TbMessageCircleFilled className="h-7 w-7" />
        ) : (
          <TbMessageCircle className="h-7 w-7" />
        )}
        <p className="text-xs">Messages</p>
      </Link>

      <Link
        href="/profile"
        className={cn(
          "flex flex-col items-center gap-px",

          pathname !== "/profile" && "opacity-50"
        )}
      >
        <Avatar src={me.photo} username={me.username} size="xs" />
        <p className={"text-xs"}>You</p>
      </Link>

      <ModeToggle />
    </div>
  );
}
