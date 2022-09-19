import Link from "next/link";
import Image from "next/future/image";
import styles from "./ProductCategories.module.scss";
import earphonesImg from "../../../public/assets/shared/desktop/image-category-thumbnail-earphones.png";
import speakersImg from "../../../public/assets/shared/desktop/image-category-thumbnail-speakers.png";
import headphonesImg from "../../../public/assets/shared/desktop/image-category-thumbnail-headphones.png";

const ProductCategories = () => {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <Image src={headphonesImg} alt="" className={styles["product-image"]} />
        <p className={styles.category}>headphones</p>
        <Link href="/">
          <a className={styles.link}>Shop</a>
        </Link>
      </div>
      <div className={styles.card}>
        <Image src={speakersImg} alt="" className={styles["product-image"]} />
        <p className={styles.category}>speakers</p>
        <Link href="/">
          <a className={styles.link}>Shop</a>
        </Link>
      </div>
      <div className={styles.card}>
        <Image src={earphonesImg} alt="" className={styles["product-image"]} />
        <p className={styles.category}>earphones</p>
        <Link href="/">
          <a className={styles.link}>Shop</a>
        </Link>
      </div>
    </div>
  );
};

export default ProductCategories;
