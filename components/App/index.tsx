import Image from "next/image";
import styles from "./App.module.css";

import { Player } from "@lottiefiles/react-lottie-player";

import Notes from "../Notes";
import Board from "../Board";

import Logo from "../../public/logo.png";
import LoadingAnimation from "../../public/animations/98092-loading.json";
import { useApp } from "../../context/AppContext";

export default function App() {
  const { isLoading } = useApp();

  if (isLoading) {
    return <Loading />;
  }

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
      <Player src={LoadingAnimation} autoplay loop style={{ width: 300 }} />
    </div>
  );
}
