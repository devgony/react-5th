import { useEffect, useState } from "react";
import styles from "../styles/Comic.module.css";

export default function Comic({ comicItem }) {
  const [src, setSrc] = useState();
  const getImageURL = async () => {
    try {
      const image = await comicItem.getImage();
      setSrc(image);
    } catch (error) {}
  };
  useEffect(() => {
    getImageURL();
  }, []);
  return (
    <li className={styles.imageContainer}>
      <img className={styles.img} src={src} alt={comicItem.name} />
      <div className={styles.overlayText}>{comicItem.name}</div>
    </li>
  );
}
