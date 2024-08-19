"use client";
import { useFormState } from "react-dom";
import FormButton from "../components/form-button";
import Input from "../components/input";
import { searchTweets } from "./actions";
import { useEffect, useRef } from "react";

export default function Search() {
  const [state, dispatch] = useFormState(searchTweets, null);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    dispatch(new FormData(formRef.current!));
  }, [dispatch]);
  return (
    <div>
      <form action={dispatch} ref={formRef}>
        <Input
          type="text"
          name="keyword"
          placeholder="search keyword"
          required={false}
          errors={state?.formErrors}
        />
        <FormButton payload="Search" />
      </form>
      {state?.tweets?.map((t) => {
        return (
          <div key={t.id}>
            <div>{t.tweet}</div>
          </div>
        );
      })}
    </div>
  );
}
