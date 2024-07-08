import { atom, AtomEffect } from "recoil";
import { CategoryKey, CategoryNode } from "./category";

type Name = string;
export enum Status {
  Wanted = "✅",
  Visited = "👍",
  Liked = "👎",
}
export type Country = Map<Name, CategoryNode>;

const localStorageEffect =
  (key: string): AtomEffect<Country> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      const rawData: [string, { ["_key"]: CategoryKey }][] =
        JSON.parse(savedValue);
      setSelf(
        new Map(
          rawData.map(([name, { _key }]) => [name, new CategoryNode(_key)])
        )
      );
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify([...newValue]));
    });
  };

export const countriesState = atom<Country>({
  key: "countries",
  default: new Map(),
  effects: [localStorageEffect("countries")],
});
