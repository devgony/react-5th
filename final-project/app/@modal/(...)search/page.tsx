"use client";
import { SlideInRight } from "@/components/framer/slide-in-right";
import Search from "@/app/search/page";

export default function SearchModal() {
  return (
    <div className="fixed top-0 pl-10 max-w-xl w-full">
      <SlideInRight>
        <Search />
      </SlideInRight>
    </div>
  );
}
