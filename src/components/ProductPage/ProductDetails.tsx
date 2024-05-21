import styles from "./ProductDetails.module.scss";

import { Accessory } from "src/pages/[category]/[productSlug]";

interface ProductDetailsProps {
  features: string;
  accessories: Accessory[];
}

const ProductDetails = ({ features, accessories }: ProductDetailsProps) => {
  return (
    <div className={styles.grid}>
      <h2 className={styles.heading}>features</h2>
      <p className={styles.description}>{features}</p>
      <h2 className={styles.headingBox}>in the box</h2>
      <ul role="list" className={styles.list}>
        {accessories.map((item) => (
          <li key={item.item} className={styles.listItem} role="listitem">
            <span className={styles.counter}>{`${item.quantity}x`}</span>
            <p className={styles.accessoryDescription}>{item.item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetails;
