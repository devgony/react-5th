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
      className="w-full h-screen p-4 bg-secondary shadow-lg animate-slide-up flex flex-col gap-4 rounded-xl"
      action={action}
    >
      <FaXmark
        className="w-7 h-7 cursor-pointer"
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
        <div className="w-full -mt-1">
          <p className="text-blue-400 pl-3 mb-1">{me?.username}</p>
          <Textarea
            className="bg-transparent min-h-48"
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
      <section className="flex justify-between fixed bottom-24 max-w-xl w-full pr-16">
        <label htmlFor="photo">
          <AiFillPicture
            className="w-10 h-10 cursor-pointer bg-primary text-primary-foreground rounded-2xl p-1 transition hover:scale-125"
            onClick={() => console.log("TODO: Add image")}
          />
        </label>
        <Button
          type="submit"
          disabled={pending}
          className="border border-black flex gap-2"
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
