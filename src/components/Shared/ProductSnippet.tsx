import styles from "./ProductSnippet.module.scss";

import Image from "next/image";
import { memo } from "react";

import Counter from "@/components/Shared/Counter";

interface SnippetProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  slug: string;
  withCounter?: boolean;
  onMinusClick?: () => void;
  onPlusClick?: () => void;
}

const ProductSnippet = ({ name, price, quantity, slug, withCounter, onMinusClick, onPlusClick }: SnippetProps) => {
  return (
    <li className={styles.grid}>
      <Image
        src={`/assets/cart/image-${slug}.jpg`}
        alt=""
        className={styles["product-image"]}
        width={150}
        height={150}
      />
      <p className={styles.name}>{name.replaceAll(/headphones|earphones|speaker|wireless/gi, "")}</p>
      <p className={styles.price}>{`$ ${price}`}</p>
      {withCounter && onMinusClick && onPlusClick ? (
        <Counter number={quantity} className={styles.counter} onMinusClick={onMinusClick} onPlusClick={onPlusClick} />
      ) : (
        <p className={styles.amount}>{quantity}x</p>
      )}
    </li>
  );
};

export default memo(ProductSnippet);
