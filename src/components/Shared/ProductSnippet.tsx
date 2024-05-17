import { useUpdateCart } from "../Cart/useUpdateCart";
import styles from "./ProductSnippet.module.scss";

import Image from "next/image";

import Counter from "@/components/Shared/Counter";

interface SnippetProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  slug: string;
  displayOnly?: boolean;
  onMinusClick?: () => void;
  onPlusClick?: () => void;
}

const ProductSnippet = ({ id, name, price, quantity, slug, displayOnly, onMinusClick, onPlusClick }: SnippetProps) => {
  const { updateCart } = useUpdateCart();

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
      {displayOnly ? (
        <p className={styles.amount}>{quantity}x</p>
      ) : (
        <Counter
          number={quantity}
          className={styles.counter}
          //@ts-ignore
          onMinusClick={() => onMinusClick()}
          //@ts-ignore

          onPlusClick={() => onPlusClick()}
        />
      )}
    </li>
  );
};

export default ProductSnippet;
