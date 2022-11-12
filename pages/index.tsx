import Head from "next/head";

import { AppProvider } from "../context/AppContext";

import App from "../components/App";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Notes Offline</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppProvider>
        <App />
      </AppProvider>
    </div>
  );
}
