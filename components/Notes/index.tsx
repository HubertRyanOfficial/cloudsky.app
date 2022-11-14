import { useApp } from "../../context/AppContext";
import styles from "./Notes.module.css";

import { motion } from "framer-motion";

import NoteItem from "../NoteItem";

interface NotesProps {
  id: string;
  title: string;
  content: string;
}

const Notes = () => {
  const {
    notes,
    forceNewNote,
  }: { notes: NotesProps[]; forceNewNote: () => void } = useApp();

  if (notes.length == 0) return <EmptyState />;

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
        transition={{ duration: 0.3 }}
        className={styles.newNote}
        onClick={() => forceNewNote()}
      >
        <strong>Criar uma nova nota</strong>
      </motion.div>

      {notes.map((item, index) => (
        <NoteItem key={item.id} item={item} index={index} />
      ))}
    </div>
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
