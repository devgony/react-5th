"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineHomeWork, MdHomeWork } from "react-icons/md";
import { ModeToggle } from "./mode-toggle";
import { BsPostcardHeart, BsPostcardHeartFill } from "react-icons/bs";
import { User } from "@prisma/client";
import { meState } from "@/lib/atoms";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

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
    <div className="fixed bottom-0 flex w-full max-w-xl justify-around border-t border-muted-foreground bg-secondary py-3">
      <Link href="/" className="flex flex-col items-center gap-px">
        {pathname === "/" ? (
          <BsPostcardHeartFill className="h-7 w-7" />
        ) : (
          <BsPostcardHeart className="h-7 w-7" />
        )}
        <p className="text-xs">Tweets</p>
      </Link>

      <Link href="/dm" className="flex flex-col items-center gap-px">
        {pathname === "/dm" ? (
          <MdHomeWork className="h-7 w-7" />
        ) : (
          <MdOutlineHomeWork className="h-7 w-7" />
        )}
        <p className="text-xs">DM</p>
      </Link>
      <Link href="/profile" className="flex flex-col items-center gap-px">
        {pathname === "/profile" ? (
          <MdHomeWork className="h-7 w-7" />
        ) : (
          <MdOutlineHomeWork className="h-7 w-7" />
        )}
        <p className="text-xs">{me.username}</p>
      </Link>

      <ModeToggle />
    </div>
  );
}
