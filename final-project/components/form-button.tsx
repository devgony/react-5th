"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

interface FormButtonProps {
  payload: string;
}

export default function FormButton({ payload }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="border border-black"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {pending ? "로딩 중" : payload}
    </Button>
  );
}
