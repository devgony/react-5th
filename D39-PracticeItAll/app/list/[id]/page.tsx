import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

type Book = {
  rank: number;
  rank_last_week: number;
  weeks_on_list: number;
  asterisk: number;
  dagger: number;
  primary_isbn10: string;
  primary_isbn13: string;
  publisher: string;
  description: string;
  price: string;
  title: string;
  author: string;
  contributor: string;
  contributor_note: string;
  book_image: string;
  book_image_width: number;
  book_image_height: number;
  amazon_product_url: string;
  age_group: string;
  book_review_link: string;
  first_chapter_link: string;
  sunday_review_link: string;
  article_chapter_link: string;
  isbns: Array<{ isbn10: string; isbn13: string }>;
  buy_links: Array<{ name: string; url: string }>;
  book_uri: string;
};

export default async function Books({ params: { id } }: Props) {
  const books: Book[] = await fetch(
    `https://books-api.nomadcoders.workers.dev/list?name=${id}`
  )
    .then((res) => res.json())
    .then((res) => res.results.books);
  const decodedId = id ? decodeURIComponent(id as string) : "";
  return (
    <>
      <h1 className="text-center text-2xl font-bold mb-2">{decodedId}</h1>
      <section className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2">
        {books.map((book, i) => (
          <article
            key={book.title}
            className="border flex flex-col justify-between"
          >
            <div>
              <img
                className="w-full h-64 object-cover"
                src={book.book_image}
                alt={book.title}
              />
              <h1 className="font-bold">{book.title}</h1>
              <h2>{book.author}</h2>
            </div>
            <Link
              className="flex justify-center"
              href={book.amazon_product_url}
              target="_blank"
            >
              <Button variant="outline" className="border-primary">
                Buy now
              </Button>
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}
