import styles from "./NoteItem.module.css";

interface Props {
  item: {
    id: string;
    title: string;
    content: string;
  };
}

const NoteItem = ({ item }: Props) => {
  return (
    <div className={styles.container}>
      <strong className={styles.title}>{item.title}</strong>
      <span className={styles.content}>{item.content}</span>
    </div>
  );
};

export default NoteItem;
