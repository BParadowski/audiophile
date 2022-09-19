import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/pages/Home.module.scss";
import Picture from "../components/Picture";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Audible</title>
        <meta name="description" content="Best audio equipment" />
        <link rel="icon" href="/assets/favicon-32x32.png" />
      </Head>
      <h1>Hello world</h1>
      <div className={styles.grid}>
        <Picture
          desktopUrl="/assets/shared/desktop/image-xx99-mark-one-headphones.jpg"
          tabletUrl="/assets/shared/tablet/image-xx99-mark-one-headphones.jpg"
          className={styles.pic}
        />
        <div className={styles.hul}>Hulabaloo</div>
      </div>
    </div>
  );
};

export default Home;
