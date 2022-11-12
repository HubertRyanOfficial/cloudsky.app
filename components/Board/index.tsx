import { useEffect, useState } from "react";
import styles from "./Board.module.css";

import { useApp } from "../../context/AppContext";

const Board = () => {
  const { addNewNote, editNote, selected, removeNote } = useApp();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setTitle(selected?.title || "");
    setContent(selected?.content || "");
  }, [selected]);

  function handleAddNewNote() {
    if (!title && !content) {
      return;
    }

    if (!selected) {
      addNewNote({ title, content });
      clearState();
    } else {
      editNote({ title, content });
    }
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
          <div className={styles.options}>
            <span
              onClick={() => handleAddNewNote()}
              className={styles.optionSave}
              style={{
                color: !title && !content ? "#ddd" : "#ee5d47",
              }}
            >
              SALVAR
            </span>
            {selected && (
              <span
                onClick={() => removeNote(selected.id)}
                className={styles.optionDelete}
              >
                EXCLUIR
              </span>
            )}
          </div>
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
