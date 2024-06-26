import styles from "./Hero.module.scss";

import Button from "@/components/Shared/Button";
import Picture from "@/components/Shared/Picture";

const Hero = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.textFlexbox}>
            <h1 className={styles.new}>new product</h1>
            <h2 className={styles.heading}>XX99 Mark II HeadphoneS</h2>
            <p className={styles.description}>
              Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
            </p>
            <Button href="/headphones/xx99-mark-two-headphones" theme="accent" as="Link" className={styles.link}>
              see product
            </Button>
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
