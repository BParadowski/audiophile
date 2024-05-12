import Link from "next/link";
import Image from "next/image";
import styles from "./ProductCategories.module.scss";
import earphonesImg from "../../../public/assets/shared/desktop/image-category-thumbnail-earphones.png";
import speakersImg from "../../../public/assets/shared/desktop/image-category-thumbnail-speakers.png";
import headphonesImg from "../../../public/assets/shared/desktop/image-category-thumbnail-headphones.png";

const ProductCategories = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <Image src={headphonesImg} alt="" className={styles["product-image"]} />
        <p className={styles.category}>headphones</p>
        <Link href="/headphones">
          <a className={styles.link} onClick={onLinkClick}>
            Shop
          </a>
        </Link>
      </div>
      <div className={styles.card}>
        <Image src={speakersImg} alt="" className={styles["product-image"]} />
        <p className={styles.category}>speakers</p>
        <Link href="/speakers">
          <a className={styles.link} onClick={onLinkClick}>
            Shop
          </a>
        </Link>
      </div>
      <div className={styles.card}>
        <Image src={earphonesImg} alt="" className={styles["product-image"]} />
        <p className={styles.category}>earphones</p>
        <Link href="/earphones">
          <a className={styles.link} onClick={onLinkClick}>
            Shop
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ProductCategories;
