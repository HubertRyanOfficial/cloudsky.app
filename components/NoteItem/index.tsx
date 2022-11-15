import { useApp } from "../../context/AppContext";
import styles from "./NoteItem.module.css";

import { motion } from "framer-motion";

interface Props {
  item: {
    id: string;
    title: string;
    content: string;
    new: boolean;
    color: string;
  };
  index: number;
}

const NoteItem = ({ item, index }: Props) => {
  const { selectNote } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: item.new ? 0 : index / 10, duration: 0.4 }}
      className={styles.container}
      onClick={() => selectNote(item.id)}
    >
      <div
        className={styles.indentifier}
        style={{ backgroundColor: `#${item.color}` }}
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
    </motion.div>
  );
};

export default NoteItem;
