import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/future/image";
import styles from "../styles/pages/Home.module.scss";
import Picture from "../components/Picture";
import Hero from "../components/Home/Hero";

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <Head>
        <title>audiophile</title>
        <meta name="description" content="Best audio equipment" />
        <link rel="icon" href="/assets/favicon-32x32.png" />
      </Head>
      <Hero />
      <div className="container">
        <div className={styles["hero-header-line"]}></div>
      </div>
    </main>
  );
};

export default Home;
