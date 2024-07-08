import { Country as Countries } from "./atoms";

export const CategoryMap = {
  Wanted: {
    description: "내가 가고싶은 나라들",
    next: {
      key: "Visited",
      icon: "✅",
    },
    prev: {
      key: "Delete",
      icon: "🗑️",
    },
  },
  Visited: {
    description: "내가 가본 나라들",
    next: { key: "Liked", icon: "👍" },
    prev: { key: "Wanted", icon: "❌" },
  },
  Liked: {
    description: "내가 좋아하는 나라들",
    next: null,
    prev: { key: "Visited", icon: "👎" },
  },
} as const;

export type CategoryKey = keyof typeof CategoryMap;
type Category = (typeof CategoryMap)[CategoryKey];

export class CategoryNode {
  _key: CategoryKey;

  constructor(key: CategoryKey) {
    this._key = key;
  }

  currentCategory(): Category {
    return CategoryMap[this._key];
  }

  next(): CategoryNode {
    const key = this.currentCategory().next?.key;
    if (!key) {
      throw new Error("Next is not available");
    }
    return new CategoryNode(key);
  }

  prev(): CategoryNode {
    const key = this.currentCategory().prev?.key;
    if (!key || key === "Delete") {
      throw new Error("Prev is not available");
    }
    return new CategoryNode(key);
  }

  moveNext(
    key: string,
    countries: Countries,
    setCountries: (countries: Countries) => void
  ) {
    if (this.currentCategory().next === null) {
      throw new Error("Next is not available");
    }
    const newCountries = new Map(countries);
    newCountries.set(key, this.next());

    setCountries(newCountries);
  }

  movePrev(
    key: string,
    countries: Countries,
    setCountries: (countries: Countries) => void
  ) {
    const newCountries = new Map(countries);
    if (this.currentCategory().prev.key == "Delete") {
      newCountries.delete(key);
    } else {
      newCountries.set(key, this.prev());
    }

    setCountries(newCountries);
  }
}
