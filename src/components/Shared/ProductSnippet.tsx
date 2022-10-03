import styles from "./ProductSnippet.module.scss";
import Image from "next/future/image";
import { useContext } from "react";
import { cartContext } from "../CartContextProvider";
import Counter from "../Shared/Counter";

interface SnippetProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  slug: string;
}

const ProductSnippet = ({ id, name, price, quantity, slug }: SnippetProps) => {
  const cartId = useContext(cartContext);

  return (
    <div className={styles.grid}>
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
      <Counter
        number={quantity}
        className={styles.counter}
        onMinusClick={() => null}
        onPlusClick={() => null}
      />
    </div>
  );
};

export default ProductSnippet;
