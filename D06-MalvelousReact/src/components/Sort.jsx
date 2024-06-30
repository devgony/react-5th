import styles from "../styles/Sort.module.css";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import { MdOutlineSortByAlpha } from "react-icons/md";

export default function Sort({ sortDirection }) {
  if (sortDirection === "asc") {
    return <FaSortAlphaDown className={styles.sort} />;
  } else if (sortDirection === "desc") {
    return <FaSortAlphaDownAlt className={styles.sort} />;
  } else {
    return <MdOutlineSortByAlpha className={styles.sort} />;
  }
}
