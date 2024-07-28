"use client";

import { categoryState } from "@/atoms";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRecoilValue } from "recoil";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Hr from "./Hr";
import { cn } from "@/lib/utils";
import H1 from "./H1";
import Info from "./Info";

export default function Header() {
  const pathname = usePathname();
  const isCategories = pathname === "/";
  const isAbout = pathname === "/about";
  const isBooks = pathname.includes("/list/");
  const category = useRecoilValue(categoryState);
  const { toast } = useToast();

  const warn = () => {
    if (category) return;

    toast({
      title: "No category selected",
      description: "↖️ Please select a category first",
    });
  };

  return (
    <>
      <nav className="flex bg-secondary h-12 sticky top-0 w-full z-9">
        <Link
          href="/"
          className="flex-1 flex flex-col items-center justify-between"
        >
          <div></div>
          <H1 active={isCategories} payload="Categories" />
          {isCategories ? <Hr /> : <div></div>}
        </Link>
        {
          <Link
            href={category ? `/list/${category}` : ""}
            className={`flex-1 flex flex-col items-center justify-between ${
              !category && "opacity-30"
            }`}
            onClick={warn}
          >
            <div></div>
            <H1 active={isBooks} payload="Books" />
            {isBooks ? <Hr /> : <div></div>}
          </Link>
        }
        <Link
          href="/about"
          className="flex-1 flex flex-col items-center justify-between"
        >
          <div></div>
          <H1 active={isAbout} payload="About" />
          {isAbout ? <Hr /> : <div></div>}
        </Link>
      </nav>
      <Info />
    </>
  );
}
