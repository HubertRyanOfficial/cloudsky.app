import { useApp } from "../../context/AppContext";
import styles from "./Notes.module.css";

import NoteItem from "../NoteItem";

interface NotesProps {
  id: string;
  title: string;
  content: string;
}

const Notes = () => {
  const { notes }: { notes: NotesProps[] } = useApp();

  return <EmptyState />;

  return (
    <div className={styles.container}>
      <NoteItem />
      <NoteItem />
      <NoteItem />
      <NoteItem />
      <NoteItem />
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
