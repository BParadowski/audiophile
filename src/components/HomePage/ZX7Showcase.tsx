import Button from "../Shared/Button";
import Picture from "../Shared/Picture";
import styles from "./ZX7Showcase.module.scss";

const ZX7Showcase = () => {
  return (
    <div className={styles.grid}>
      <Picture
        desktopUrl="/assets/home/desktop/image-speaker-zx7.jpg"
        tabletUrl="/assets/home/tablet/image-speaker-zx7.jpg"
        mobileUrl="/assets/home/mobile/image-speaker-zx7.jpg"
        alt="A magnificent speaker"
        className={styles.picture}
      />
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>ZX7 SPEAKER</h2>
        <Button href="/speakers/zx7-speaker" className={styles.link} theme="neutralLight" as="Link">
          see product
        </Button>
      </div>
    </div>
  );
};

export default ZX7Showcase;
