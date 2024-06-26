import Button from "../Shared/Button";
import Picture from "../Shared/Picture";
import styles from "./YX1Showcase.module.scss";

const YX1Showcase = () => {
  return (
    <div className={styles.grid}>
      <Picture
        desktopUrl="/assets/home/desktop/image-earphones-yx1.jpg"
        tabletUrl="/assets/home/tablet/image-earphones-yx1.jpg"
        mobileUrl="/assets/home/mobile/image-earphones-yx1.jpg"
        alt="A pair of earphones, charging"
        className={styles.image}
      />
      <div className={styles.card}>
        <h2 className={styles.heading}>YX1 EARPHONES</h2>
        <Button href="/earphones/yx1-earphones" className={styles.link} theme="neutralLight" as="Link">
          see product
        </Button>
      </div>
    </div>
  );
};

export default YX1Showcase;
