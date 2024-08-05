"use client";
import { useFormStatus } from "react-dom";

interface FormButtonProps {
  payload: string;
}

export default function FormButton({ payload }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="border border-black">
      {pending ? "로딩 중" : payload}
    </button>
  );
}
