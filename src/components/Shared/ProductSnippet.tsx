import styles from "./ProductSnippet.module.scss";
import Image from "next/image";
import { useContext } from "react";
import { cartContext } from "../CartContextProvider";
import Counter from "../Shared/Counter";

interface SnippetProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  slug: string;
  displayOnly?: boolean;
}

const ProductSnippet = ({
  id,
  name,
  price,
  quantity,
  slug,
  displayOnly,
}: SnippetProps) => {
  const cart = useContext(cartContext);

  return (
    <li className={styles.grid}>
      <Image
        src={`/assets/cart/image-${slug}.jpg`}
        alt=""
        className={styles["product-image"]}
        width={150}
        height={150}
      />
      <p className={styles.name}>
        {name.replaceAll(/headphones|earphones|speaker|wireless/gi, "")}
      </p>
      <p className={styles.price}>{`$ ${price}`}</p>
      {displayOnly ? (
        <p className={styles.amount}>{quantity}x</p>
      ) : (
        <Counter
          number={quantity}
          className={styles.counter}
          onMinusClick={() => cart?.updateItem(id, quantity - 1)}
          onPlusClick={() => cart?.updateItem(id, quantity + 1)}
        />
      )}
    </li>
  );
};

export default ProductSnippet;
