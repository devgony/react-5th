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
  src?: string;
}
export default function _Avatar({ username, src }: Props) {
  const firstLetter = username[0];
  const hash = stringToHash(username);
  const randomBgColor = hashToColor(hash);
  const randomFgColor = `#${(0xffffff - parseInt(randomBgColor, 16)).toString(
    16
  )}`;
  console.log(randomBgColor, randomFgColor);
  return (
    <Avatar className="size-12">
      <AvatarImage src={src} />
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
