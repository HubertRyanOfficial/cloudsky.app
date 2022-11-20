import { useState } from "react";

import { useApp } from "../../context/AppContext";
import styles from "./Notes.module.css";

import { AnimatePresence, motion } from "framer-motion";

import { BiDotsHorizontalRounded } from "react-icons/bi";

import NoteItem from "../NoteItem";
import { NoteItemProps } from "../NoteItem";

interface NotesProps {
  id: string;
  tag: {
    id: string;
    name: string;
  };
  notes: NoteItemProps[];
}

const Notes = ({ titleRef }: { titleRef: any }) => {
  const {
    notes,
    forceNewNote,
    total,
  }: {
    notes: NotesProps[];
    forceNewNote: () => void;
    total: number;
  } = useApp();

  if (total == 0) return <EmptyState />;

  return (
    <div className={styles.container}>
      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        whileTap={{
          scale: 0.9,
        }}
        transition={{ duration: 0.2 }}
        className={styles.newNote}
        onClick={() => {
          forceNewNote();
          if (titleRef?.current) {
            titleRef.current.focus();
          }
        }}
      >
        <strong>Criar uma nova nota</strong>
      </motion.div>

      {notes.map((item) => {
        if (item?.notes?.length == 0) return null;
        if (item.tag)
          return (
            <div className={styles.notesGroupContainer} key={item.id}>
              <NoteGroupTitle title={item.tag.name} />
              <div className={styles.notesGroup}>
                {item.notes.map((noteItem: NoteItemProps, index) => (
                  <NoteItem key={noteItem.id} item={noteItem} index={index} />
                ))}
              </div>
            </div>
          );

        return (
          <div key={item.id}>
            {item.notes.map((noteItem: NoteItemProps, index) => (
              <NoteItem key={noteItem.id} item={noteItem} index={index} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

const NoteGroupTitle = ({ title }: { title: string }) => {
  const [showsOptions, setShowsOptions] = useState(false);
  return (
    <>
      <motion.div
        onClick={() => setShowsOptions(!showsOptions)}
        className={styles.notesGroupTitle}
        whileTap={{ scale: 0.9 }}
      >
        <div className={styles.notesGroupTitleCircle} />
        <span>{title.charAt(0).toUpperCase() + title.slice(1)}</span>
        <BiDotsHorizontalRounded
          size={25}
          color="#dddddd"
          style={{ marginRight: 20 }}
        />
      </motion.div>

      <AnimatePresence>
        {showsOptions && (
          <motion.div
            initial={{
              opacity: 1,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
            }}
            className={styles.notesGroupModalContainer}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileTap={{ scale: 0.8 }}
            >
              Fixar
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              animate={{ opacity: 1 }}
              whileTap={{ scale: 0.8 }}
            >
              Renomear
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              whileTap={{ scale: 0.8 }}
            >
              Excluir projeto
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const EmptyState = () => {
  return (
    <div className={styles.emptyContainer}>
      <span>
        Aqui ficarão todas as suas notas. Comece a criar suas notas no lado
        direito!
      </span>
    </div>
  );
};

export default Notes;
