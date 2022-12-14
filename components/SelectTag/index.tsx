import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useApp } from "../../context/AppContext";

import { BiX, BiCheck, BiUnlink, BiLinkAlt } from "react-icons/bi";
import styles from "./SelectTag.module.css";

export default function SelectTag({ titleRef }: { titleRef: any }) {
  const { createNewTag, tags, tagSelected, selectTag, fixTag, setFixTag } =
    useApp();

  const [showTags, setShowTags] = useState(false);
  const [newProject, setNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState<string>();

  function handleSelectNewProject() {
    setShowTags(!showTags);

    if (!newProject && tags.length == 1) {
      setNewProject(true);
    } else if (newProject) {
      setNewProject(false);
      setNewProjectName("");
    }
  }

  function handleCreateNewProject() {
    if (!newProjectName) return;

    createNewTag(newProjectName);
    setNewProject(false);
    setShowTags(false);
    setNewProjectName("");

    handleFocusTitleInput();
  }

  function handleSelectTag(tag: any) {
    if (tag?.id != tagSelected?.id) {
      selectTag(tag);
    }

    setNewProject(false);
    setShowTags(false);
    handleFocusTitleInput();
  }

  function handleFixTag() {
    setFixTag(!fixTag);

    if (!fixTag == true) {
      handleFocusTitleInput();
    }
  }

  function handleFocusTitleInput() {
    if (titleRef?.current) {
      titleRef.current.focus();
    }
  }

  return (
    <div className={styles.content}>
      <motion.div
        initial={{ opacity: 0, width: 180, height: 40 }}
        animate={{
          width: [!showTags ? 40 : 200, !showTags ? 200 : 40],
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
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
            style={{
              color: !!tagSelected ? "#ff4f4b" : "#000",
              fontWeight: !!tagSelected ? 500 : 400,
            }}
          >
            {!!tagSelected ? tagSelected?.name : "Selecionar projeto"}
          </motion.span>
        ) : (
          <BiX size={22} color="#ff4f4b" />
        )}
      </motion.div>

      <AnimatePresence>
        {!showTags && !newProject && !!tagSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            whileHover={{ opacity: 0.5 }}
            whileTap={{ scale: 0.9 }}
            className={styles.clearContent}
            style={{
              backgroundColor: fixTag ? "#ff4f4b" : "#ffffff",
            }}
            onClick={() => handleFixTag()}
          >
            <BiLinkAlt size={22} color={!fixTag ? "#ff4f4b" : "#ffffff"} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTags && !newProject && tagSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            whileHover={{ opacity: 0.5 }}
            whileTap={{ scale: 0.9 }}
            className={styles.clearContent}
            onClick={() => handleSelectTag(null)}
          >
            <BiUnlink size={22} color="#ff4f4b" />
          </motion.div>
        )}
      </AnimatePresence>

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
              <TagItem
                key={tagItem.id}
                name={tagItem.name}
                onClick={() => handleSelectTag(tagItem)}
              />
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
                onKeyDown={(e) =>
                  e.key == "Enter" ? handleCreateNewProject() : null
                }
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

function TagItem({ name, onClick }: { name: string; onClick: any }) {
  return (
    <div className={styles.tagItem} onClick={onClick}>
      <strong>{name}</strong>
    </div>
  );
}
