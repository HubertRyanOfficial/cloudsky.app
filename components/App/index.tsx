import styles from "./App.module.css";

import Notes from "../Notes";
import Board from "../Board";

export default function App() {
  return (
    <main className={styles.main}>
      <Notes />
      <Board />
    </main>
  );
}
