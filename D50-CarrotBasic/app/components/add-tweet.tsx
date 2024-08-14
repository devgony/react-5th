import db from "@/lib/db";
import FormButton from "./form-button";
import Input from "./input";
import { addTweet } from "../actoins";
import { useFormState } from "react-dom";

export default function AddTweet() {
  const [state, dispatch] = useFormState(addTweet, null);
  console.log(state);
  return (
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
  );
}
