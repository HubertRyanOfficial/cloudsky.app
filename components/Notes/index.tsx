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
  return (
    <div className={styles.notesGroupTitle}>
      <div className={styles.notesGroupTitleCircle} />
      <span>{title.charAt(0).toUpperCase() + title.slice(1)}</span>
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
