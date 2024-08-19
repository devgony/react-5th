"use client";
import { useOptimistic, useRef } from "react";
import { useFormState } from "react-dom";
import { createResponse, ResponsesType } from "../tweets/[id]/actions";
import FormButton from "./form-button";
import Input from "./input";
import { z } from "zod";

interface Props {
  responses: ResponsesType;
  tweetId: number;
}

export default function Responses({ responses, tweetId }: Props) {
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

      return {
        responses: [
          ...prev.responses,
          {
            id: prev.responses.length + 1,
            payload,
            created_at: new Date(),
            tweetId: 0,
            userId: 0,
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
  return (
    <div>
      <h1 className="text-xl font-bold">Responses</h1>
      {state.responses.map((r, i) => (
        <div key={i} className="flex gap-2">
          <p>by {r.userId}:</p>
          <p>{r.payload}</p>
        </div>
      ))}
      <form className="w-fit" action={action}>
        <Input
          type="text"
          name="response"
          placeholder="response"
          required
          errors={formState?.formErrors}
        />
        <FormButton payload="Save response" />
      </form>
    </div>
  );
}
