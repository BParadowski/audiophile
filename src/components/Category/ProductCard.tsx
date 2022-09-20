import { ProductCardData } from "../../utils/types";
import Picture from "../Shared/Picture";
import styles from "./ProductCard.module.scss";
import Link from "next/link";

const ProductCard = ({ product }: { product: ProductCardData }) => {
  const { name, slug, description, isNew, category, preview } = product;
  return (
    <section className={styles["product-card"]}>
      <div className={styles.grid}>
        <Picture
          desktopUrl={preview.desktop}
          tabletUrl={preview.tablet}
          mobileUrl={preview.mobile}
          alt="Picutre of the accessory"
          className={styles.image}
        />
        {isNew && <p className={styles.new}>new product</p>}
        <h2 className={styles.heading}>{name}</h2>
        <p className={styles.description}>{description}</p>
        <Link href={`/${category}/${slug}`} className="button-accent">
          <a>see product</a>
        </Link>
      </div>
    </section>
  );
};

export default ProductCard;
