import styles from "@/styles/pages/Home.module.scss";

import type { NextPage } from "next";
import Head from "next/head";

import Hero from "@/components/HomePage/Hero";
import YX1Showcase from "@/components/HomePage/YX1Showcase";
import ZX7Showcase from "@/components/HomePage/ZX7Showcase";
import ZX9Showcase from "@/components/HomePage/ZX9Showcase";
import Manifesto from "@/components/Shared/Manifesto";
import ProductCategories from "@/components/Shared/ProductCategories";

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
        <div className={styles.categoriesWrapper}>
          <ProductCategories />
        </div>

        <section aria-labelledby="home-section" className={styles.productsWrapper}>
          <h2 id="home-section" className="sr-only">
            Most popular
          </h2>
          <div className={styles.grid}>
            <ZX9Showcase />
            <ZX7Showcase />
            <YX1Showcase />
          </div>
        </section>

        <div className={styles.manifestoWrapper}>
          <Manifesto />
        </div>
      </div>
    </main>
  );
};

export default Home;
