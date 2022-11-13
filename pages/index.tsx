import Head from "next/head";

import { AppProvider } from "../context/AppContext";

import App from "../components/App";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>
          Cloudsky - Suas ideias, notas e projetos, seu lugar para a
          organização.
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Suas ideias, notas e projetos, seu lugar para a
          organização."
        />
      </Head>

      <AppProvider>
        <App />
      </AppProvider>
    </div>
  );
}
