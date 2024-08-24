"use client";

import {
  GrFormNextLink,
  GrFormPrevious,
  GrFormPreviousLink,
} from "react-icons/gr";
import { IoClose } from "react-icons/io5";

interface Props {
  variant?: "x" | "arrow";
}

export default function GoBack({ variant = "x" }: Props) {
  if (variant === "arrow") {
    return (
      <GrFormPreviousLink
        className="cursor-pointer"
        size={32}
        onClick={() => {
          history.back();
        }}
      />
    );
  }

  return (
    <IoClose
      className="cursor-pointer"
      size={32}
      onClick={() => {
        history.back();
      }}
    />
  );
}
