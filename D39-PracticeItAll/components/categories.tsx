"use client";

import { Category, updatedColor, UpdatedEnum, UpdatedKey } from "@/app/actions";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRecoilState } from "recoil";
import { categoryState } from "@/atoms";
import { Badge } from "./ui/badge";

interface Props {
  initialCategories: Category[];
}

enum Duration {
  ALL = "ALL",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}
interface IForm {
  keyword?: string;
  duration: Duration;
}
export default function Categories({ initialCategories }: Props) {
  const [categories, setCategories] = useState(initialCategories);
  useEffect(() => {
    setCategories(initialCategories);
  }, []);
  const form = useForm<IForm>({
    defaultValues: {
      duration: Duration.ALL,
    },
  });
  const onSubmit = ({ keyword, duration }: IForm) => {
    setCategories(() =>
      initialCategories
        .filter((b) => duration === Duration.ALL || b.updated === duration)
        .filter(
          (b) =>
            !keyword ||
            b.list_name.toLowerCase().includes(keyword.toLowerCase())
        )
    );
  };
  const [_, setCategory] = useRecoilState(categoryState);
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-center gap-1 m-2"
        >
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Select a duration" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ALL">All</SelectItem>
                  <SelectItem value="WEEKLY">Weekly</SelectItem>
                  <SelectItem value="MONTHLY">Monthly</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <FormField
            control={form.control}
            name="keyword"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Search keyword.." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="outline" className="border-primary">
            Search
          </Button>
        </form>
      </Form>
      <section className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 m-2">
        {categories.map((category) => (
          <Link
            href={`/list/${category.list_name}`}
            onClick={() => setCategory(category.list_name)}
            key={category.list_name}
            className="p-4 border rounded-xl hover:animate-bounce"
          >
            <Badge className={`${updatedColor(category.updated)}`}>
              {category.updated}
            </Badge>
            <h2 className="text-lg font-bold">{category.display_name}</h2>
          </Link>
        ))}
        {categories.length === 0 && (
          <h1>No results found. Try other keywords.</h1>
        )}
      </section>
    </>
  );
}
