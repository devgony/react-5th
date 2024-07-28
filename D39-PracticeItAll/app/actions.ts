export enum UpdatedEnum {
  MONTHLY = "bg-green-500",
  WEEKLY = "bg-blue-500",
}

export type UpdatedKey = keyof typeof UpdatedEnum;

export interface Category {
  list_name: string;
  display_name: string;
  list_name_encoded: string;
  oldest_published_date: string;
  newest_published_date: string;
  updated: UpdatedKey;
}

export const updatedColor = (key: UpdatedKey): string => UpdatedEnum[key];

export async function getCategories(): Promise<Category[]> {
  return fetch("https://books-api.nomadcoders.workers.dev/lists")
    .then((res) => res.json())
    .then((res) => res.results);
}
