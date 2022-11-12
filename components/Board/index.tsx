import { useState } from "react";
import styles from "./Board.module.css";

import { useApp } from "../../context/AppContext";

const Board = () => {
  const { addNewNote } = useApp();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleAddNewNote() {
    addNewNote({ title, content });
    clearState();
  }

  function clearState() {
    setTitle("");
    setContent("");
  }

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
            autoFocus
          />
          <span onClick={() => handleAddNewNote()}>SALVAR</span>
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
