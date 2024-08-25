"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { FaCircleArrowUp } from "react-icons/fa6";
import { LoaderIcon } from "lucide-react";

export default function SendButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="absolute right-5"
      type="submit"
      disabled={pending}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {pending ? (
        <LoaderIcon className="animate-spin mr-2" />
      ) : (
        <FaCircleArrowUp className="size-10 transition-colors hover:text-primary" />
      )}
    </button>
  );
}
