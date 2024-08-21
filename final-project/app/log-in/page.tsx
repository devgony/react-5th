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
      className="flex flex-col w-full gap-3 justify-center h-screen"
    >
      <h1 className="text-xl font-bold text-center">Welcome back!</h1>
      <p className="text-muted-foreground text-center mb-12">
        We&#39;re so excited to see you again!
      </p>
      <p className="text-muted-foreground text-sm">Account Information</p>
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
      <p className="text-blue-400 text-sm">Forget your password?</p>
      <FormButton payload="Log in" />
    </form>
  );
}
