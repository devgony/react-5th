import { Link } from "react-router-dom";
import styles from "../styles/CharacterCard.module.css";

export default function CharacterCard({id, name, image}) {
  return (
    <Link
      className={styles.card}
      key={id}
      to={`/character/${id}`}
    >
      <img
        className={styles.img}
        src={image}
        alt={name}
      />
      <label>{name}</label>
    </Link>
  );
}
