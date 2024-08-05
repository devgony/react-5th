"use client";

import { useFormState } from "react-dom";
import FormButton from "./components/form-button";
import handleForm from "./actions";
import { Fragment } from "react";

export default function Home() {
  const [state, action] = useFormState(handleForm, null);
  if (state?.payload) {
    alert(state.payload);
  }
  return (
    <main className="flex justify-center items-center">
      <form action={action} className="flex flex-col">
        <input name="email" type="email" placeholder="email" />
        <input name="username" type="text" placeholder="username" />
        <input name="password" type="password" placeholder="password" />
        {state?.errors?.map((e, i) => (
          <Fragment key={i}>
            <p className="text-red-500">{e}</p>
          </Fragment>
        ))}
        <FormButton payload="Log in" />
      </form>
    </main>
  );
}
