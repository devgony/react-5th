import { Link, Outlet, useParams } from "react-router-dom";
import db from "../db";

export default function BookDetail() {
  const { name, book } = useParams();
  return (
    <div>
      <h1>{db.getBookName(name, book)}</h1>
      <ul>
        <li>
          <Link to={`/author/${name}/${book}/chapters`}>Chapters</Link>
        </li>
        <li>
          <Link to={`/author/${name}/${book}/characters`}>Characters</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
