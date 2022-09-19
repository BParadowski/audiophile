import Picture from "../../components/Picture";
import styles from "./Hero.module.scss";
import Link from "next/link";

const Hero = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles["hero-container"]}>
        <div className={styles.grid}>
          <div className={styles.text}>
            <p className={styles["new-product"]}>new product</p>
            <h2>XX99 Mark II HeadphoneS</h2>
            <p className={styles["hero-text"]}>
              Experience natural, lifelike audio and exceptional build quality
              made for the passionate music enthusiast.
            </p>
            <Link href="/">
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
