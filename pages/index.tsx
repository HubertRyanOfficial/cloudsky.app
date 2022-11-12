import Head from "next/head";

import { AppProvider } from "../context/AppContext";

import App from "../components/App";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>YouNoty | Suas notas offline</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Suas notas, ideias em um local seguro e sem servidor."
        />
      </Head>

      <AppProvider>
        <App />
      </AppProvider>
    </div>
  );
}
