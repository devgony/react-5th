import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function stringToHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function hashToColor(hash: number): string {
  const color = (hash & 0x00ffffff).toString(16).toUpperCase();
  return "00000".substring(0, 6 - color.length) + color;
}

interface Props {
  username: string;
  src?: string | null;
  size?: "xs" | "sm" | "md";
  className?: string;
}
export default function _Avatar({
  username = "",
  src,
  size = "sm",
  className,
}: Props) {
  const firstLetter = username[0];
  const hash = stringToHash(username);
  const randomBgColor = hashToColor(hash);
  const randomFgColor = `#${(0xffffff - parseInt(randomBgColor, 16)).toString(
    16
  )}`;
  // const sizeClass = size === "sm" ? "size-12" : "size-16";
  const sizeClass = (() => {
    switch (size) {
      case "xs":
        return "size-8";
      case "sm":
        return "size-12";
      case "md":
        return "size-16";
      default:
        return "size-12";
    }
  })();

  const notNullSrc = src ?? "";

  return (
    <Avatar className={cn(sizeClass, className)}>
      <AvatarImage src={notNullSrc} />
      <AvatarFallback
        style={{
          backgroundColor: `#${randomBgColor}`,
          color: `${randomFgColor}`,
        }}
      >
        {firstLetter}
      </AvatarFallback>
    </Avatar>
  );
}
