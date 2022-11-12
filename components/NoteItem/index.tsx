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
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  return (
    <div className={styles.container} onClick={() => selectNote(item.id)}>
      <div
        className={styles.indentifier}
        style={{ backgroundColor: `#${randomColor}` }}
      />
      <strong
        className={styles.title}
        style={{
          color: !!item.title ? "#000000" : "#dddddd",
        }}
      >
        {!!item.title ? item.title : "Sem-Título"}
      </strong>
      {!!item.content && (
        <span className={styles.content}>
          {item.content.length > 30
            ? item.content.substring(0, 30).concat("...")
            : item.content}
        </span>
      )}
    </div>
  );
};

export default NoteItem;
