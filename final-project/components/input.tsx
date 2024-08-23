import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface InputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors?: string[];
  name: string;
  className?: string;
  color?: "primary" | "secondary" | "none";
}

const _Input = (
  {
    name,
    errors = [],
    className,
    color = "secondary",
    ...rest
  }: InputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const colorClass = (() => {
    switch (color) {
      case "primary":
        return "bg-primary text-primary-foreground";
      case "secondary":
        return "bg-secondary text-secondary-foreground";
      default:
        return "";
    }
  })();
  return (
    <div className="flex w-full flex-col gap-2">
      <Input
        ref={ref}
        name={name}
        // className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        className={cn(colorClass, className)}
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className="font-medium text-red-500">
          {error}
        </span>
      ))}
    </div>
  );
};

export default forwardRef(_Input);
