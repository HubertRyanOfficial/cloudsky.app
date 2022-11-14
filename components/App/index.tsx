import styles from "./App.module.css";

import { motion } from "framer-motion";

import Notes from "../Notes";
import Board from "../Board";

import { useApp } from "../../context/AppContext";

export default function App() {
  const { isLoading } = useApp();

  if (isLoading) return <Loading />;

  return (
    <main className={styles.main}>
      <Notes />
      <Board />
    </main>
  );
}

function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <motion.span
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 2.5 }}
        drag
        dragConstraints={{ bottom: 50, left: 50, right: 50, top: 50 }}
        whileHover={{ scale: 2.2 }}
        whileDrag={{ opacity: 0.8 }}
        transition={{ duration: 1, type: "spring" }}
      >
        Cloudsky
      </motion.span>
    </div>
  );
}
