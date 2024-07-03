import { useParams } from "react-router-dom";
import db from "../db";

export default function BookCharacters() {
  const { name, book } = useParams();
  return (
    <ul>
      {db.getCharacters(name, book).map((character) => (
        <li key={character}>{character}</li>
      ))}
    </ul>
  );
}
