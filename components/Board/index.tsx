import { useState } from "react";
import styles from "./Board.module.css";

interface Props {}

const Board = ({}: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
            autoCapitalize="words"
          />
          <span>EXCLUIR</span>
        </div>
        <div className={styles.separator} />
      </div>
      <textarea
        value={content}
        className={styles.inputItemContent}
        placeholder="Ideias na nova nota"
        onChange={(e) => setContent(e.target.value)}
        autoCapitalize="words"
      />
    </div>
  );
};

export default Board;
