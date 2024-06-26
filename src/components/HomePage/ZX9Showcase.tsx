import Button from "../Shared/Button";
import Picture from "../Shared/Picture";
import styles from "./ZX9Showcase.module.scss";

import Link from "next/link";

const ZX9Showcase = () => {
  return (
    <div className={styles.grid}>
      <Picture
        desktopUrl="/assets/home/desktop/image-speaker-zx9.png"
        tabletUrl="/assets/home/tablet/image-speaker-zx9.png"
        mobileUrl="/assets/home/mobile/image-speaker-zx9.png"
        alt="A magnificent speaker"
        className={styles.picture}
      />
      <h2 className={styles.heading}>ZX9 SPEAKER</h2>
      <p className={styles.description}>
        Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
      </p>
      <Button href="/speakers/zx9-speaker" className={styles.link} theme="neutralDark" as="Link">
        see product
      </Button>
    </div>
  );
};

export default ZX9Showcase;
