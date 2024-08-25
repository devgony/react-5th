"use client";
import { addTweet } from "../app/actions";
import { useFormState, useFormStatus } from "react-dom";
import Input from "./input";
import { useRecoilValue } from "recoil";
import { meState } from "@/lib/atoms";
import { Textarea } from "./ui/textarea";
import { FaCirclePlus, FaXmark } from "react-icons/fa6";
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
import Avatar from "./avatar";
import { FromBottom } from "@/layouts/from-bottom";

export default function AddTweet() {
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

  const [showInput, toggleShowInput] = useState(false);
  const toggleInput = () => {
    toggleShowInput(!showInput);
  };
  if (!showInput) {
    return (
      <FaCirclePlus
        className="fixed bottom-28 cursor-pointer text-primary transition hover:scale-125 max-w-xl mx-auto"
        size={48}
        onClick={toggleInput}
      />
    );
  }

  const onSubmit = handleSubmit(async (data: TweetType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);

    if (file && data.photo) {
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
      formData.append("photo", data.photo);
    }

    const errors = await addTweet(formData);
    if (errors) {
      console.error(errors);
    }

    toggleShowInput(false);
  });

  const action = async () => {
    await onSubmit();
  };
  return (
    <form
      className="animate-slide-up flex fixed w-full flex-col gap-4 rounded-2xl bg-secondary p-4 shadow-lg z-999 mx-auto min-h-screen max-w-xl -ml-4 mt-4 border-x-8 border-background"
      action={action}
    >
      <FaXmark
        className="h-7 w-7 cursor-pointer"
        onClick={() => toggleShowInput(false)}
      />
      <Input
        className="text-2xl border-0"
        type="text"
        {...register("title")}
        placeholder="Title"
        required
        errors={[errors.title?.message ?? ""]}
      />
      <section className="flex gap-2">
        <Avatar src={me?.photo} username={me?.username ?? ""} />
        <div className="-mt-1 w-full">
          <p className="mb-1 pl-3 text-blue-400">{me?.username}</p>
          <Textarea
            className="min-h-96 bg-transparent border-0 resize-none"
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
          <AiFillPicture className="h-10 w-10 cursor-pointer rounded-2xl bg-primary p-1 text-primary-foreground transition hover:scale-125" />
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
          onImageChange<keyof TweetType>(
            event,
            setPreview,
            setFile,
            setUploadUrl,
            setValue
          )
        }
        type="file"
        id="photo"
        name="photo"
        accept="image/*"
        className="hidden"
      />
      <span className="text-red-500">
        {errors.content?.message ?? ""}
        {errors.photo?.message ?? ""}
      </span>
    </form>
  );
}
