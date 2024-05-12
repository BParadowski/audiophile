import Picture from "../Shared/Picture";
import styles from "./ProductCard.module.scss";
import Link from "next/link";

const ProductCard = ({
  product,
}: {
  product: {
    categoryName: string | null;
    name: string;
    slug: string;
    isNew: boolean;
    description: string;
  };
}) => {
  const { name, slug, description, isNew, categoryName } = product;
  return (
    <section aria-labelledby={`${name}id`} className={styles["product-card"]}>
      <div className={styles.grid}>
        <Picture
          desktopUrl={`/assets/product-${slug}/desktop/image-category-page-preview.jpg`}
          tabletUrl={`/assets/product-${slug}/tablet/image-category-page-preview.jpg`}
          mobileUrl={`/assets/product-${slug}/mobile/image-category-page-preview.jpg`}
          alt="Picutre of the accessory"
          className={styles.image}
        />
        <div className={styles["text-wrapper"]}>
          {isNew && <p className={styles.new}>new product</p>}
          <h2 id={`${name}id`} className={styles.heading}>
            {name}
          </h2>
          <p className={styles.description}>{description}</p>
          <Link href={`/${categoryName}/${slug}`} className="button-accent">
            see product
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
