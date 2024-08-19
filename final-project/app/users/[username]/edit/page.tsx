"use client";
import Input from "@/app/components/input";
import { getUserByUsername, getUserByUsernameCached, User } from "../actions";
import { UsernameParams } from "../page";
import { useEffect, useState } from "react";
import { editUser, editUserCached } from "./actions";
import { useFormState } from "react-dom";
import { notFound } from "next/navigation";
import FormButton from "@/app/components/form-button";

export default function EditProfile({ params: { username } }: UsernameParams) {
  const [user, setUser] = useState<User>();
  const [state, dispatch] = useFormState((_: any, formData: FormData) => {
    if (!user) {
      notFound();
    }
    return editUserCached(formData, user);
  }, null);

  useEffect(() => {
    getUserByUsernameCached(username).then((user) => setUser(user));
  }, [username, state]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, target: string) =>
    setUser((prev) =>
      prev ? { ...prev, [target]: e.target.value } : undefined
    );

  return (
    <div>
      <form action={dispatch}>
        <Input
          type="text"
          name="email"
          placeholder="email"
          required
          value={user?.email || ""}
          onChange={(e) => onChange(e, "email")}
        />
        <Input
          type="text"
          name="username"
          placeholder="username"
          required
          value={user?.username || ""}
          onChange={(e) => onChange(e, "username")}
        />
        <Input
          type="text"
          name="bio"
          placeholder="bio"
          required
          value={user?.bio || ""}
          onChange={(e) => onChange(e, "bio")}
        />
        <FormButton payload="edit" />
      </form>
      <p>{user?.updated_at.toString()}</p>
    </div>
  );
}
