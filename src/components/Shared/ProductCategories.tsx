import styles from "./ProductCategories.module.scss";

import earphonesImg from "@/public/assets/shared/desktop/image-category-thumbnail-earphones.png";
import headphonesImg from "@/public/assets/shared/desktop/image-category-thumbnail-headphones.png";
import speakersImg from "@/public/assets/shared/desktop/image-category-thumbnail-speakers.png";

import Image from "next/image";
import Link from "next/link";

const ProductCategories = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <Image src={headphonesImg} alt="" className={styles["product-image"]} />
        <p className={styles.category}>headphones</p>
        <Link href="/headphones" className={styles.link} onClick={onLinkClick}>
          Shop
        </Link>
      </div>
      <div className={styles.card}>
        <Image src={speakersImg} alt="" className={styles["product-image"]} />
        <p className={styles.category}>speakers</p>
        <Link href="/speakers" className={styles.link} onClick={onLinkClick}>
          Shop
        </Link>
      </div>
      <div className={styles.card}>
        <Image src={earphonesImg} alt="" className={styles["product-image"]} />
        <p className={styles.category}>earphones</p>
        <Link href="/earphones" className={styles.link} onClick={onLinkClick}>
          Shop
        </Link>
      </div>
    </div>
  );
};

export default ProductCategories;
