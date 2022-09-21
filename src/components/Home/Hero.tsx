import Picture from "../Shared/Picture";
import styles from "./Hero.module.scss";
import Link from "next/link";

const Hero = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles["hero-container"]}>
        <div className={styles.grid}>
          <div className={styles.text}>
            <h1 className={styles["new-product"]}>new product</h1>
            <h2>XX99 Mark II HeadphoneS</h2>
            <p className={styles["hero-text"]}>
              Experience natural, lifelike audio and exceptional build quality
              made for the passionate music enthusiast.
            </p>
            <Link href="/headphones/xx99-mark-two-headphones">
              <a className="button-accent">see product</a>
            </Link>
          </div>
          <Picture
            className={styles.picture}
            desktopUrl="/assets/home/tablet/image-header.jpg"
            mobileUrl="/assets/home/mobile/image-header.jpg"
            alt="Very stylish headphones"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
