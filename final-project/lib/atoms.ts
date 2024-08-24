import { User } from "@prisma/client";
import { atom } from "recoil";

export const meState = atom<User | undefined>({
  key: "me",
  default: undefined,
});
