import Button from "../Shared/Button";
import styles from "./ProductCard.module.scss";

import Picture from "@/components/Shared/Picture";

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
    <section aria-labelledby={`${name}id`} className={styles.card}>
      <div className={styles.grid}>
        <Picture
          desktopUrl={`/assets/product-${slug}/desktop/image-category-page-preview.jpg`}
          tabletUrl={`/assets/product-${slug}/tablet/image-category-page-preview.jpg`}
          mobileUrl={`/assets/product-${slug}/mobile/image-category-page-preview.jpg`}
          alt="Picutre of the accessory"
          className={styles.image}
        />
        <div className={styles.wrapper}>
          {isNew && <p className={styles.new}>new product</p>}
          <h2 id={`${name}id`} className={styles.heading}>
            {name}
          </h2>
          <p className={styles.description}>{description}</p>
          <Button href={`/${categoryName}/${slug}`} theme="accent" as="Link">
            see product
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
