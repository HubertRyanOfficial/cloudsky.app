import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useApp } from "../../context/AppContext";

import { BiX, BiCheck } from "react-icons/bi";
import styles from "./SelectTag.module.css";

export default function SelectTag() {
  const { createNewTag, tags } = useApp();

  const [showTags, setShowTags] = useState(false);
  const [newProject, setNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState<string>();

  function handleSelectNewProject() {
    setShowTags(!showTags);
    if (newProject) {
      setNewProject(false);
      setNewProjectName("");
    }
  }

  function handleCreateNewProject() {
    if (!newProjectName) return;

    createNewTag(newProjectName);
    setNewProject(false);
    setNewProjectName("");
  }

  return (
    <div className={styles.content}>
      <motion.div
        initial={{ opacity: 0, width: 180, height: 40 }}
        animate={{
          width: [!showTags ? 40 : 200, !showTags ? 200 : 40],
          opacity: 1,
        }}
        whileTap={{ scale: 0.9 }}
        className={styles.container}
        onClick={() => handleSelectNewProject()}
      >
        {!showTags ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: !showTags ? 1 : 0 }}
            transition={{ delay: 0.5 }}
          >
            Selecionar projeto
          </motion.span>
        ) : (
          <BiX size={22} color="#ff4f4b" />
        )}
      </motion.div>

      <AnimatePresence>
        {!newProject && showTags && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -20,
            }}
            className={styles.tagsContainer}
          >
            {tags.map((tagItem: any) => (
              <TagItem key={tagItem.id} name={tagItem.name} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTags && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className={styles.newProject}
            whileTap={{ scale: 0.9 }}
            onClick={() => setNewProject(true)}
          >
            {!newProject ? (
              <span>Novo projeto</span>
            ) : (
              <input
                value={newProjectName}
                autoFocus
                onChange={(e) => setNewProjectName(e.target.value)}
                maxLength={40}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {newProject && (
          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
            }}
            whileTap={{ scale: 0.9 }}
            className={styles.newProjectConfirm}
            onClick={() => handleCreateNewProject()}
          >
            <BiCheck size={22} color="#ff4f4b" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TagItem({ name }: { name: string }) {
  return (
    <div className={styles.tagItem}>
      <strong>{name}</strong>
    </div>
  );
}
