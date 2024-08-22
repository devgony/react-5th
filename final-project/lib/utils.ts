import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getUploadUrl } from "./cloudflare";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const onImageChange = async (
  event: React.ChangeEvent<HTMLInputElement>,
  setPreview: (url: string) => void,
  setFile: (file: File) => void,
  setUploadUrl: (url: string) => void,
  setValue: (name: "photo" | "title" | "content", value: string) => void
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
    setValue("photo", `${process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGE_URL}/${id}`);
  }
};

export function formatToTimeAgo(date: string): string {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.round((time - now) / dayInMs);

  const formatter = new Intl.RelativeTimeFormat("ko");

  return formatter.format(diff, "days");
}
