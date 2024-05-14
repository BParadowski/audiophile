import { cartContext } from "../CartContextProvider";
import styles from "./AddToCart.module.scss";

import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import Counter from "@/components/Shared/Counter";

interface AddToCartProps {
  productId: number;
}

const AddToCart = ({ productId }: AddToCartProps) => {
  const cart = useContext(cartContext);
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  /* Brings product count back to one every time a user switches product pages */
  useEffect(() => {
    setQuantity(1);
  }, [router.query]);

  return (
    <div className={styles.wrapper}>
      <Counter
        number={quantity}
        onMinusClick={() => {
          if (quantity > 1) {
            setQuantity(quantity - 1);
          }
        }}
        onPlusClick={() => setQuantity(quantity + 1)}
      />
      {cart?.addingProduct ? (
        <button className={`button-accent ${styles.add}`}>Adding...</button>
      ) : (
        <button
          className={`button-accent ${styles.add}`}
          onClick={() => {
            cart?.addItem(productId, quantity);
            setQuantity(1);
          }}
        >
          add to cart
        </button>
      )}
    </div>
  );
};

export default AddToCart;
