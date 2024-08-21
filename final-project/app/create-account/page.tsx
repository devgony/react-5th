"use client";

import { useFormState } from "react-dom";
import handleForm from "./actions";
import Input from "../../components/input";
import FormButton from "../../components/form-button";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(handleForm, null);
  return (
    <form
      action={dispatch}
      className="flex flex-col w-full gap-3 justify-center h-screen"
    >
      <h1 className="text-xl font-bold text-center">Enter your email</h1>
      <p className="text-muted-foreground text-center mb-12">
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
      {/* TODO: add password confirm */}
      <FormButton payload="Create Account" />
    </form>
  );
}
