import React, { useState } from "react";
import { motion } from "framer-motion";

import styles from "./SelectTag.module.css";

export default function SelectTag() {
  const [showTags, setShowTags] = useState(true);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, width: 180 }}
        animate={{ width: [180, 200], opacity: 1 }}
        whileTap={{ scale: 0.9 }}
        className={styles.container}
      >
        <span>Selecionar projeto</span>
      </motion.div>
    </div>
  );
}
