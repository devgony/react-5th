"use server";

export default async function handleForm(prevState: any, formData: FormData) {
  console.log(prevState);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const password = formData.get("password");

  if (password !== "12345") {
    return { errors: ["wrong password", "try 12345"] };
  }

  return { payload: "Login successful!" };
}
