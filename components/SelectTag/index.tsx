import React, { useState } from "react";
import { motion } from "framer-motion";

import { BiX } from "react-icons/bi";
import styles from "./SelectTag.module.css";

export default function SelectTag() {
  const [showTags, setShowTags] = useState(false);

  return (
    <div className={styles.content}>
      <motion.div
        initial={{ opacity: 0, width: 180, height: 40 }}
        animate={{
          width: [!showTags ? 180 : 200, !showTags ? 200 : 40],
          opacity: 1,
        }}
        whileTap={{ scale: 0.9 }}
        className={styles.container}
        onClick={() => setShowTags(!showTags)}
      >
        {!showTags ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: !showTags ? 1 : 0 }}
          >
            Selecionar projeto
          </motion.span>
        ) : (
          <BiX size={22} color="#ff4f4b" />
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: showTags ? 1 : 0, x: showTags ? 0 : -20 }}
        className={styles.tagsContainer}
      >
        <TagItem />
        <TagItem />
        <TagItem />
        <TagItem />
      </motion.div>
    </div>
  );
}

function TagItem() {
  return (
    <div className={styles.tagItem}>
      <strong>Tapedin</strong>
    </div>
  );
}
