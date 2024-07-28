import { cn } from "@/lib/utils";

interface Props {
  active: boolean;
  payload: string;
}

export default function H1({ active, payload }: Props) {
  return (
    <h1
      className={cn(
        "text-2xl font-bold w-full text-center rounded-md",
        active && "bg-background"
      )}
    >
      {payload}
    </h1>
  );
}
