"use client";

import { useFormState } from "react-dom";
import createAccount from "./actions";
import Input from "../../components/input";
import FormButtom from "../../components/form-button";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <form
      action={dispatch}
      className="flex h-screen w-full flex-col justify-center gap-3 px-4"
    >
      <h1 className="text-center text-xl font-bold">Enter your email</h1>
      <p className="mb-12 text-center text-muted-foreground">
        and set your unique username
      </p>
      <Input
        name="email"
        type="email"
        placeholder="Email"
        required={true}
        errors={state?.fieldErrors?.email}
      />
      <Input
        name="username"
        type="text"
        placeholder="Username"
        required={true}
        errors={state?.fieldErrors?.username}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        required={true}
        errors={state?.fieldErrors?.password}
      />
      <Input
        name="confirm"
        type="password"
        placeholder="Confirm Password"
        required={true}
        errors={state?.fieldErrors?.confirm}
      />
      {/* TODO: add password confirm */}
      <FormButtom payload="Create Account" />
    </form>
  );
}
