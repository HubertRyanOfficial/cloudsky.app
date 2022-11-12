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

export default Notes;
