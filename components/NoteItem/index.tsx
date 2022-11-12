import { useApp } from "../../context/AppContext";
import styles from "./NoteItem.module.css";

interface Props {
  item: {
    id: string;
    title: string;
    content: string;
  };
}

const NoteItem = ({ item }: Props) => {
  const { selectNote } = useApp();

  return (
    <div className={styles.container} onClick={() => selectNote(item.id)}>
      <strong
        className={styles.title}
        style={{
          color: !!item.title ? "#000000" : "#dddddd",
        }}
      >
        {!!item.title ? item.title : "Sem-Título"}
      </strong>
      <span className={styles.content}>{item.content}</span>
    </div>
  );
};

export default NoteItem;
