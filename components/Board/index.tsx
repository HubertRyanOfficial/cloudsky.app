import { useEffect, useRef, useState } from "react";
import styles from "./Board.module.css";

import { motion } from "framer-motion";
import { useApp } from "../../context/AppContext";

import SelectTag from "../SelectTag";

const Board = ({ titleRef }: { titleRef: any }) => {
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
      <SelectTag titleRef={titleRef} />
      <div className={styles.inputContainer}>
        <div className={styles.inputContent}>
          <input
            ref={titleRef}
            value={title}
            className={styles.inputItem}
            maxLength={50}
            placeholder="Nova nota"
            onChange={(e) => setTitle(e.target.value)}
            autoCapitalize="words"
            autoFocus
            onKeyDown={(e) => (e.key == "Enter" ? handleAddNewNote() : null)}
          />
          <div className={styles.options}>
            <motion.span
              onClick={() => handleAddNewNote()}
              className={styles.optionSave}
              style={{
                color: !title && !content ? "#ddd" : "#ee5d47",
              }}
            >
              Salvar
            </motion.span>
            {selected && (
              <motion.span
                onClick={() => removeNote()}
                className={styles.optionDelete}
              >
                Excluir
              </motion.span>
            )}
          </div>
        </div>
        <div className={styles.separator} />
      </div>
      <textarea
        value={content}
        className={styles.inputItemContent}
        placeholder="Coisas na nova nota"
        onChange={(e) => setContent(e.target.value)}
        autoCapitalize="words"
      />
    </div>
  );
};

export default Board;
