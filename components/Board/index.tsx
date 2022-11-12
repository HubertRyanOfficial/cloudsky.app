import { useState } from "react";
import styles from "./Board.module.css";

interface Props {}

const Board = ({}: Props) => {
  const [title, setTitle] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <div className={styles.inputContent}>
          <input
            value={title}
            className={styles.inputItem}
            maxLength={50}
            placeholder="Nova nota"
            onChange={(e) => setTitle(e.target.value)}
          />
          <span>EXCLUIR</span>
        </div>
        <div className={styles.separator} />
      </div>
    </div>
  );
};

export default Board;
