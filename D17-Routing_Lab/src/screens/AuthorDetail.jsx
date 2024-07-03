import { Link, Outlet, useParams } from "react-router-dom";
import db from "../db";

export default function AuthorDetail() {
  const { name } = useParams();
  return (
    <div>
      <h1>{db.getAuthorName(name)}</h1>
      {db.getBooks(name).map(({ bookName, bookSlug }) => (
        <li key={bookSlug}>
          <Link to={`/author/${name}/${bookSlug}`}>{bookName}</Link>
        </li>
      ))}
      <Outlet />
    </div>
  );
}
