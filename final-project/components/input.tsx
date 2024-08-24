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
}

const _Input = (
  {
    name,
    errors = [],
    className,
    ...rest
  }: InputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Input
        ref={ref}
        name={name}
        // className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        className={cn("bg-secondary text-secondary-foreground", className)}
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
};

export default forwardRef(_Input);
