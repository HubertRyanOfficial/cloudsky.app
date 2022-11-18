import { useRef } from "react";
import styles from "./App.module.css";

import { motion } from "framer-motion";

import Notes from "../Notes";
import Board from "../Board";

import { useApp } from "../../context/AppContext";

export default function App() {
  const titleRef = useRef<any>(null);

  const { isLoading } = useApp();

  if (isLoading) return <Loading />;

  return (
    <main className={styles.main}>
      <Notes titleRef={titleRef} />
      <Board titleRef={titleRef} />
    </main>
  );
}

function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <motion.h1
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 2.5 }}
        drag
        dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
        whileHover={{ scale: 2.2 }}
        whileDrag={{ opacity: 0.8 }}
        transition={{ duration: 1, type: "spring" }}
      >
        Cloudsky
      </motion.h1>
    </div>
  );
}
