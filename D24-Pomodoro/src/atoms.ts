import { atom } from "recoil";
import { INIT_SECONDS } from "./const";

export const remainingSecondsState = atom<number>({
  key: "remainingSeconds",
  default: INIT_SECONDS,
});

export const intervalIdState = atom<NodeJS.Timeout | null>({
  key: "intervalId",
  default: null,
});

export const roundState = atom<number>({
  key: "round",
  default: 0,
});

export const goalState = atom<number>({
  key: "goal",
  default: 0,
});
