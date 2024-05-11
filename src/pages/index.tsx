import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import Image from "next/future/image";
import styles from "../styles/pages/Home.module.scss";
import Picture from "../components/Shared/Picture";
import Hero from "../components/Home/Hero";
import ProductCategories from "../components/Shared/ProductCategories";
import Manifesto from "../components/Shared/Manifesto";

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
        <div className={styles["categories-wrapper"]}>
          <ProductCategories />
        </div>

        <section
          aria-labelledby="home-section"
          className={styles["products-wrapper"]}
        >
          <h1 id="home-section" className="sr-only">
            Most popular
          </h1>
          <div className={styles.grid}>
            <div className={styles.big}>
              <Picture
                desktopUrl="/assets/home/desktop/image-speaker-zx9.png"
                tabletUrl="/assets/home/tablet/image-speaker-zx9.png"
                mobileUrl="/assets/home/mobile/image-speaker-zx9.png"
                alt="A magnificent speaker"
                className={styles.big_picture}
              />
              <h2 className={styles.big_heading}>ZX9 SPEAKER</h2>
              <p>
                Upgrade to premium speakers that are phenomenally built to
                deliver truly remarkable sound.
              </p>
              <Link href="/speakers/zx9-speaker">
                <a className="button-neutral-dark">see product</a>
              </Link>
            </div>
            <div className={styles.medium}>
              <Picture
                desktopUrl="/assets/home/desktop/image-speaker-zx7.jpg"
                tabletUrl="/assets/home/tablet/image-speaker-zx7.jpg"
                mobileUrl="/assets/home/mobile/image-speaker-zx7.jpg"
                alt="A magnificent speaker"
                className={styles.medium_picture}
              />
              <div className={styles.medium_wrapper}>
                <h2 className={styles.medium_heading}>ZX7 SPEAKER</h2>
                <Link href="/speakers/zx7-speaker">
                  <a className="button-neutral-light">see product</a>
                </Link>
              </div>
            </div>
            <Picture
              desktopUrl="/assets/home/desktop/image-earphones-yx1.jpg"
              tabletUrl="/assets/home/tablet/image-earphones-yx1.jpg"
              mobileUrl="/assets/home/mobile/image-earphones-yx1.jpg"
              alt="A pair of earphones, charging"
              className={styles.image}
            />
            <div className={styles.small}>
              <h2 className={styles.small_heading}>YX1 EARPHONES</h2>
              <Link href="/earphones/yx1-earphones">
                <a className="button-neutral-light">see product</a>
              </Link>
            </div>
          </div>
        </section>

        <div className={styles["manifesto-wrapper"]}>
          <Manifesto />
        </div>
      </div>
    </main>
  );
};

export default Home;
