"use client";

import { useFormState } from "react-dom";
import handleForm from "./actions";
import Input from "../../components/input";
import FormButton from "../../components/form-button";

export default function Login() {
  const [state, dispatch] = useFormState(handleForm, null);
  return (
    <form
      action={dispatch}
      className="flex h-screen w-full flex-col justify-center gap-3"
    >
      <h1 className="text-center text-xl font-bold">Welcome back!</h1>
      <p className="mb-12 text-center text-muted-foreground">
        We&#39;re so excited to see you again!
      </p>
      <p className="text-sm text-muted-foreground">Account Information</p>
      <Input
        name="email"
        type="email"
        placeholder="Email"
        required={true}
        errors={state?.fieldErrors?.email}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        required={true}
        errors={state?.fieldErrors?.password}
      />
      <p className="text-sm text-blue-400">Forget your password?</p>
      <FormButton payload="Log in" />
    </form>
  );
}
