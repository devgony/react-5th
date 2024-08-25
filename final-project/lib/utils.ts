import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getUploadUrl } from "./cloudflare";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const onImageChange = async <T extends string>(
  event: React.ChangeEvent<HTMLInputElement>,
  setPreview: (url: string) => void,
  setFile: (file: File) => void,
  setUploadUrl: (url: string) => void,
  setValue: (name: T, value: string) => void
  // setValue: (name: "photo" | "title" | "content", value: string) => void
) => {
  const {
    target: { files },
  } = event;
  if (!files) {
    return;
  }
  const file = files[0];

  if (file?.type.split("/")[0] !== "image") {
    alert("이미지 파일만 업로드 가능합니다."); // TODO: toast
    return;
  }

  if (file.type === "image/svg+xml") {
    alert("SVG files are not allowed.");
    return;
  }

  if (file.size > 1024 * 1024 * 5) {
    alert("5MB 이하의 이미지만 업로드 가능합니다."); // TODO: toast
    return;
  }

  const url = URL.createObjectURL(file);
  setPreview(url);
  setFile(file);

  const { success, result } = await getUploadUrl();
  if (success) {
    const { id, uploadURL } = result;
    setUploadUrl(uploadURL);
    setValue(
      "photo" as T,
      `${process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGE_URL}/${id}/public`
    );
  }
};

export function formatDate(date: string): string {
  const parsedDate = new Date(date);

  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  const year = parsedDate.getFullYear();

  let hours = parsedDate.getHours();
  const minutes = String(parsedDate.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strTime = `${hours}:${minutes} ${ampm}`;

  return `${month}/${day}/${year} ${strTime}`;
}

// export async function dw() {
//   await new Promise((resolve) => setTimeout(resolve, 3 * 1000));
// }

export function formatToTimeAgo2(date: string): string {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);

  const formatter = new Intl.RelativeTimeFormat("ko");

  return formatter.format(diff, "days");
}
