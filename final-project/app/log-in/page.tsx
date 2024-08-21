"use client";

import { useFormState } from "react-dom";
import handleForm from "./actions";
import Input from "../../components/input";
import FormButton from "../../components/form-button";

export default function Login() {
  const [state, dispatch] = useFormState(handleForm, null);
  return (
    <main className="flex justify-center items-center flex-col">
      <form action={dispatch} className="flex flex-col">
        <Input
          name="email"
          type="email"
          placeholder="email"
          required={true}
          errors={state?.fieldErrors?.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="password"
          required={true}
          errors={state?.fieldErrors?.password}
        />
        <FormButton payload="Log in" />
      </form>
    </main>
  );
}
