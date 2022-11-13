import styles from "./App.module.css";

import Lottie from "react-lottie-player";

import Notes from "../Notes";
import Board from "../Board";

import LoadingAnimation from "../animations/98092-loading.json";
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
      <Lottie
        animationData={LoadingAnimation}
        play
        loop
        style={{ width: 300 }}
      />
    </div>
  );
}
