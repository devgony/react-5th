import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Character } from "../entities/character";
import styles from "../styles/Detail.module.css";
import Comic from "../components/Comic";
import Link from "react-router-dom/Link";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [character, setCharacter] = useState([]);
  const getCharacter = async () => {
    try {
      const data = await fetch(
        `${import.meta.env.VITE_CHARACTERS_DETAIL_URL}/${id}`
      );
      const res = await data.json();
      const character = res.data.results.map(Character.fromJson).shift();
      if (!character) throw new Error("Character not found");
      setCharacter(character);
      setLoading(false);
      console.log(character.comics);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getCharacter();
  }, []); 
  return (
    <main className={styles.main}>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <section className={styles.content}>
          <h1>{character.name}</h1>
          <img
            className={styles.img}
            src={character.getImage()}
            alt={character.name}
          />
          <div className={styles.dummy} />
          <h2>Comics list</h2>
          <ul className={styles.grid}>
            {character.comics.items.map((comicItem) => (
              <Comic key={comicItem.name} comicItem={comicItem} />
            ))}
          </ul>
          <Link to="/" className={styles.back}>
            <RiArrowGoBackFill color={"white"} />
          </Link>
        </section>
      )}
    </main>
  );
}
