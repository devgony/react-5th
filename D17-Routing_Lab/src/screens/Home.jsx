import { Link } from "react-router-dom";
import db from "../db";

function Home() {
  return (
    <div>
      <h1>Best Seller Authors</h1>
      <ul>
        {db.getAuthors().map((row) => (
          <li key={row.authorSlug}>
            <Link to={`/author/${row.authorSlug}`} state={row}>
              {row.authorName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Home;
