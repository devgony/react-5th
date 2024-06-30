import { useEffect, useState } from "react";
import { Character } from "../entities/character";
import styles from "../styles/Home.module.css";
import Sort from "../components/Sort";
import CharacterCard from "../components/CharacterCard";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [search, setSearch] = useState();
  const [sortDirection, setSortDirection] = useState(null);
  const getCharacters = async () => {
    try {
      const data = await fetch(import.meta.env.VITE_CHARACTERS_URL);
      const res = await data.json();
      const characters = res.data.results.map(Character.fromJson);
      setCharacters(characters);
      setFilteredCharacters(characters);
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearch(search);

    if (!search) {
      setSortDirection(null);
      setFilteredCharacters(characters);
      return;
    }

    const filteredCharacters = characters.filter((character) =>
      character.name.toLowerCase().includes(search.toLowerCase())
    );
    sortCharacters(filteredCharacters);
  };

  const sortCharacters = (characters) => {
    if (sortDirection === "asc") {
      setFilteredCharacters(
        [...characters].sort((a, b) => a.name.localeCompare(b.name))
      );
    } else if (sortDirection === "desc") {
      setFilteredCharacters(
        [...characters].sort((a, b) => b.name.localeCompare(a.name))
      );
    } else {
      setFilteredCharacters(characters);
    }
  };

  const handleSort = () => {
    if (sortDirection === "asc") {
      setSortDirection("desc");
    } else {
      setSortDirection("asc");
    }
  };

  useEffect(() => {
    sortCharacters(filteredCharacters);
  }, [sortDirection]);

  useEffect(() => {
    getCharacters();
  }, []);
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>The Marvel Characters</h1>
      <section className={styles.controlBar}>
        <div className={styles.dummy}></div>
        <input
          placeholder="Search character name..."
          className={styles.searchInput}
          value={search}
          onChange={handleSearch}
        />
        <div className={styles.sortWrapper}>
          <span onClick={handleSort}>
            <Sort sortDirection={sortDirection} />
          </span>
        </div>
      </section>

      <section className={styles.grid}>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          filteredCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              id={character.id}
              name={character.name}
              image={character.getImage()}
            />
          ))
        )}
      </section>
    </main>
  );
}
