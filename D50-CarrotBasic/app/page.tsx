"use client";

import { useFormState } from "react-dom";
import FormButton from "./components/form-button";
import handleForm from "./actions";
import { Fragment } from "react";
import Input from "./components/input";

export default function Home() {
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
          name="username"
          type="text"
          placeholder="username"
          required={true}
          errors={state?.fieldErrors?.username}
        />
        <Input
          name="password"
          type="password"
          placeholder="password"
          required={true}
          errors={state?.fieldErrors?.password}
        />
        <FormButton payload="Log in" />
        {state?.logined && (
          <output className="w-full h-10 bg-green-400 border flex justify-center items-center">
            Welcome back!
          </output>
        )}
      </form>
    </main>
  );
}
