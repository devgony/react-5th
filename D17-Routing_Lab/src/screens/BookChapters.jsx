import { useParams } from "react-router-dom";
import db from "../db";

export default function BookChapters() {
  const { name, book } = useParams();
  return (
    <ul>
      {db.getChapters(name, book).map((chapter) => (
        <li key={chapter}>{chapter}</li>
      ))}
    </ul>
  );
}
