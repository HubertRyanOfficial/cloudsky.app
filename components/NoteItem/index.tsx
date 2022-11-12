import styles from "./NoteItem.module.css";

const NoteItem = () => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Ola</span>
      <span className={styles.content}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
        repellat doloribus odio molestias iure ad numquam, nam id? Eligendi...
      </span>
    </div>
  );
};

export default NoteItem;
