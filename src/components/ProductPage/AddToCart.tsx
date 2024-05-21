import { useAddToCart } from "../Cart/useAddToCart";
import Button from "../Shared/Button";
import styles from "./AddToCart.module.scss";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Counter from "@/components/Shared/Counter";

interface AddToCartProps {
  productId: number;
}

const AddToCart = ({ productId }: AddToCartProps) => {
  const { addToCart, isAdding } = useAddToCart();
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
      {isAdding ? (
        <Button className={styles.add} theme="accent">
          Adding...
        </Button>
      ) : (
        <Button
          theme="accent"
          className={styles.add}
          onClick={() => {
            addToCart({ productId, quantity });
            setQuantity(1);
          }}
        >
          add to cart
        </Button>
      )}
    </div>
  );
};

export default AddToCart;
