import { useApp } from "../../context/AppContext";
import styles from "./Notes.module.css";

interface NotesProps {
  id: string;
  title: string;
  content: string;
}

const Notes = () => {
  const { notes }: { notes: NotesProps[] } = useApp();

  return <div className={styles.container}></div>;
};

export default Notes;
