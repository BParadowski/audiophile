import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/pages/Home.module.scss";
import Picture from "../components/Picture";

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <Head>
        <title>Audible</title>
        <meta name="description" content="Best audio equipment" />
        <link rel="icon" href="/assets/favicon-32x32.png" />
      </Head>
      <div className="container">
        <h1>Hello world</h1>
      </div>
    </main>
  );
};

export default Home;
