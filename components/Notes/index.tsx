import { useApp } from "../../context/AppContext";
import styles from "./Notes.module.css";

import { motion } from "framer-motion";

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

const Notes = () => {
  const {
    notes,
    forceNewNote,
    total,
  }: { notes: NotesProps[]; forceNewNote: () => void; total: number } =
    useApp();

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
        transition={{ duration: 0.2 }}
        className={styles.newNote}
        onClick={() => forceNewNote()}
      >
        <strong>Criar uma nova nota</strong>
      </motion.div>

      {notes.map((item) => {
        if (item.notes.length == 0) return null;
        if (item.tag)
          return (
            <div key={item.id}>
              <div className={styles.notesGroupTitle}>
                <span>{item.tag.name}</span>
              </div>
              <div className={styles.notesGroup}>
                {item.notes.map((noteItem: NoteItemProps, index) => (
                  <NoteItem key={noteItem.id} item={noteItem} index={index} />
                ))}
              </div>
            </div>
          );

        return (
          <div key={item.id} className={styles.notesGroup}>
            {item.notes.map((noteItem: NoteItemProps, index) => (
              <NoteItem key={noteItem.id} item={noteItem} index={index} />
            ))}
          </div>
        );
      })}
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
