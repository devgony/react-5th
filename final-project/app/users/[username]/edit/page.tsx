"use client";
import { FaPencilAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Input from "@/components/input";
import { getUserByUsername, getUserByUsernameCached, User } from "../actions";
import { UsernameParams } from "../page";
import { useEffect, useState } from "react";
import { editUser, editUserCached } from "./actions";
import { useFormState } from "react-dom";
import { notFound } from "next/navigation";
import FormButton from "@/components/form-button";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { onImageChange } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema, EditUserType } from "@/lib/schema";

export default function EditProfile({ params: { username } }: UsernameParams) {
  // const [user, setUser] = useState<User>();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditUserType>({
    resolver: zodResolver(editUserSchema),
  });
  console.log(errors);
  const [prevUser, setPrevUser] = useState<User>();

  // const [state, dispatch] = useFormState((_: any, formData: FormData) => {
  //   if (!user) {
  //     notFound();
  //   }
  //   return editUserCached(formData, user);
  // }, null);

  useEffect(() => {
    getUserByUsernameCached(username).then((user) => {
      const { email, username, bio, photo } = user;
      // setUser(user);
      setValue("email", email);
      setValue("username", username);
      bio && setValue("bio", bio);
      photo && setValue("photo", photo);
      setPrevUser(user);
    });
  }, [username, setValue]);

  const [preview, setPreview] = useState<string>();
  const [uploadUrl, setUploadUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = handleSubmit(async (data: EditUserType) => {
    console.log("onSubmit");
    if (!prevUser) {
      console.error("no user");
      return;
    }

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("bio", data.bio);

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

    const errors = await editUser(formData, prevUser);
    if (errors) {
      console.error(errors);
    }
  });

  const action = async () => {
    console.log("actionx");
    await onSubmit();
  };

  console.log(watch("photo"));

  return (
    <form action={action} className="bg-secondary min-h-screen">
      <div className="flex justify-between items-center py-1">
        <IoClose onClick={() => history.back()} size={36} />
        <h1 className="text-xl font-bold">Edit Profile</h1>
        <Button type="submit" variant="ghost" className="text-primary">
          Save
        </Button>
      </div>
      <section className="h-36 bg-primary/50" />
      <label
        className="absolute -mt-12 rounded-full bg-background p-1 z-1 ml-4 cursor-pointer"
        htmlFor="photo"
      >
        <Avatar
          className="z-1"
          username={watch("username")}
          size="md"
          src={preview ?? watch("photo") ?? ""}
        />
        <div className="rounded-full size-6 bg-secondary absolute right-0 top-0 z-99 flex justify-center items-center">
          <FaPencilAlt className="text-muted-foreground" size={12} />
        </div>
      </label>
      <input
        onChange={(event) =>
          onImageChange<keyof EditUserType>(
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
      <div className="mt-16 bg-background rounded-xl p-4 flex flex-col gap-2 mx-4">
        <h1 className="text-2xl font-bold text-secondary-foreground">
          {watch("username")}
        </h1>
        <h2 className="mb-8">{watch("email")}</h2>
        <Label htmlFor="email" className="text-xs text-muted-foreground">
          Email
        </Label>
        <Input
          type="text"
          {...register("email")}
          placeholder="email"
          required
          color="none"
          errors={[errors.email?.message ?? ""]}
        />
        <Label htmlFor="username" className="text-xs text-muted-foreground">
          Username
        </Label>
        <Input
          type="text"
          {...register("username")}
          placeholder="username"
          required
          color="none"
          errors={[errors.username?.message ?? ""]}
        />
        <Label htmlFor="bio" className="text-xs text-muted-foreground">
          About me
        </Label>
        <Textarea
          className="resize-none"
          {...register("bio")}
          placeholder="bio"
          required
          // value={user?.bio || ""}
          // onChange={(e) => onChange(e, "bio")}
          color="none"
          rows={12}
        />
        <span className="font-medium text-red-500">{errors.bio?.message}</span>
        <span className="font-medium text-red-500">
          {errors.photo?.message}
        </span>
      </div>
    </form>
  );
}
