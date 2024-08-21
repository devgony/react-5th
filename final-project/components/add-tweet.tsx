import db from "@/lib/db";
import FormButton from "./form-button";
import { addTweet } from "../app/actoins";
import { useFormState } from "react-dom";
import Input from "./input";

export default function AddTweet() {
  const [state, dispatch] = useFormState(addTweet, null);
  console.log(state);
  return (
    <div className="w-full h-screen p-4 bg-secondary shadow-lg animate-slide-up">
      <form className="w-fit" action={dispatch}>
        <Input
          type="text"
          name="tweet"
          placeholder="sth to tweet..."
          required
          errors={state?.formErrors}
        />
        <FormButton payload="Add Tweet" />
      </form>
    </div>
  );
}
