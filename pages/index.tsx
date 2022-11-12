import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { Player } from "@lottiefiles/react-lottie-player";

import App from "../components/App";

import Logo from "../public/logo.png";
import LoadingAnimation from "../public/animations/98092-loading.json";

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
      <Player src={LoadingAnimation} autoplay loop style={{ width: 300 }} />
    </div>
  );
}
