"use client";
import { addTweet } from "../app/actoins";
import { useFormState, useFormStatus } from "react-dom";
import Input from "./input";
import { useRecoilValue } from "recoil";
import { meState } from "@/lib/atoms";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "./ui/textarea";
import { FaXmark } from "react-icons/fa6";
import { Dispatch, SetStateAction, useState } from "react";
import { AiFillPicture } from "react-icons/ai";
import { IoChatbubbleOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { onImageChange } from "@/lib/utils";
import { Tweet } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tweetSchema, TweetType } from "@/lib/schema";
import Image from "next/image";

interface Props {
  toggleShowInput: Dispatch<SetStateAction<boolean>>;
}
export default function AddTweet({ toggleShowInput }: Props) {
  // const [state, dispatch] = useFormState(addTweet, null);
  const me = useRecoilValue(meState);
  const { pending } = useFormStatus();
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TweetType>({
    resolver: zodResolver(tweetSchema),
  });
  const onSubmit = handleSubmit(async (data: TweetType) => {
    if (!file) {
      return;
    }
    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);
    const response = await fetch(uploadUrl, {
      method: "post",
      body: cloudflareForm,
    });

    if (response.status !== 200) {
      console.error("response status is not 200");
      return;
    }
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("photo", data.photo);

    const errors = await addTweet(formData);
    if (errors) {
      console.error(errors);
    }
  });

  const action = async () => {
    console.log("action");

    await onSubmit();
  };
  return (
    <form
      className="animate-slide-up flex h-screen w-full flex-col gap-4 rounded-xl bg-secondary p-4 shadow-lg"
      action={action}
    >
      <FaXmark
        className="h-7 w-7 cursor-pointer"
        onClick={() => toggleShowInput(false)}
      />
      <Input
        className="text-2xl"
        type="text"
        {...register("title")}
        placeholder="Title"
        required
        errors={[errors.title?.message ?? ""]}
      />
      <section className="flex gap-2">
        <Avatar className="size-12">
          <AvatarImage src="https://github.com/devgony.png" />
          <AvatarFallback>avatar</AvatarFallback>
        </Avatar>
        <div className="-mt-1 w-full">
          <p className="mb-1 pl-3 text-blue-400">{me?.username}</p>
          <Textarea
            className="min-h-48 bg-transparent"
            placeholder="Enter a tweet"
            {...register("content")}
          />
        </div>
      </section>
      {preview && (
        <Image
          className="mx-auto"
          src={preview}
          alt="preview"
          width={200}
          height={200}
        />
      )}
      <section className="fixed bottom-24 flex w-full max-w-xl justify-between pr-16">
        <label htmlFor="photo">
          <AiFillPicture
            className="h-10 w-10 cursor-pointer rounded-2xl bg-primary p-1 text-primary-foreground transition hover:scale-125"
            onClick={() => console.log("TODO: Add image")}
          />
        </label>
        <Button
          type="submit"
          disabled={pending}
          className="flex gap-2 border border-black"
        >
          <IoChatbubbleOutline size={24} />
          {pending ? "로딩 중" : "Post"}
        </Button>
      </section>
      <input
        onChange={(event) =>
          onImageChange(event, setPreview, setFile, setUploadUrl, setValue)
        }
        type="file"
        id="photo"
        name="photo"
        accept="image/*"
        className="hidden"
      />
    </form>
  );
}
