"use client";
import { useEffect, useOptimistic, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { createResponse, ResponsesType } from "../app/tweets/[id]/actions";
import FormButtom from "./form-button";
import Input from "./input";
import { z } from "zod";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { text } from "stream/consumers";
import Article from "./article";
import { meState } from "@/lib/atoms";
import { useRecoilValue } from "recoil";
import { notFound } from "next/navigation";

interface Props {
  responses: ResponsesType;
  tweetId: number;
  myId: number;
}

export default function Responses({ responses, tweetId, myId }: Props) {
  const me = useRecoilValue(meState);
  const [state, reducerFn] = useOptimistic(
    { responses },
    (prev, formData: FormData) => {
      const schema = z
        .string()
        .refine((x) => !x.includes("wrong"), "remove keyword: 'wrong'");
      const data = formData.get("response");
      const { success, error, data: payload } = schema.safeParse(data);
      if (!success || !payload) {
        return { responses: prev.responses };
      }

      if (!me) {
        notFound();
      }

      return {
        responses: [
          ...prev.responses,
          {
            id: prev.responses.length + 1,
            payload,
            created_at: new Date(),
            tweetId: 0,
            userId: 0,
            user: {
              id: me?.id,
              username: me?.username,
              photo: me?.photo,
            },
          },
        ],
      };
    }
  );

  const action = (payload: FormData) => {
    reducerFn(payload);
    dispatch(payload);
  };

  const [formState, dispatch] = useFormState(
    (prevState: any, formData: FormData) =>
      createResponse(prevState, formData, tweetId),
    null
  );

  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const scrollHeight = textareaRef.current?.scrollHeight;
    console.log(scrollHeight);
    if (scrollHeight && scrollHeight > 400) {
      return;
    }
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      <div className="p-4 flex flex-col gap-2 ">
        {state.responses.map(
          (
            { id, user: { id: userId, username, photo }, payload, created_at },
            i
          ) => (
            <Article
              userId={userId}
              type="response"
              id={id}
              key={`response-${i}`}
              username={username}
              content={payload}
              updated_at={created_at}
              photo={photo}
              myId={myId}
            />
          )
        )}
      </div>
      <div className="my-8" />
      <form
        className="flex items-end fixed max-w-xl w-full bottom-20 mx-auto gap-px px-4"
        action={action}
      >
        <Textarea
          ref={textareaRef}
          className="h-auto w-full resize-none rounded-xl bg-secondary hide-scrollbar"
          name="response"
          placeholder="Send a response..."
          required
          value={value}
          onChange={handleChange}
          rows={1}
          // errors={formState?.formErrors}
        />
        <FormButtom payload="Send" />
      </form>
    </>
  );
}
