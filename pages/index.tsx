import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import App from "../components/App";

import Logo from "../public/logo.png";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Notes Offline</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <App /> */}
      <Loading />
    </div>
  );
}

function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <Image width={200} src={Logo} alt="YouNoty" />
    </div>
  );
}
