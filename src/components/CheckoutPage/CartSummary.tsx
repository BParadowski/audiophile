import { useCart } from "../Cart/useCart";
import styles from "./CartSummary.module.scss";

import { PropsWithChildren } from "react";
import { SHIPPING_COST_IN_DOLLARS, VAT } from "src/constants/constants";

import ProductSnippet from "@/components/Shared/ProductSnippet";

const CartSummary = ({ children }: PropsWithChildren) => {
  const cart = useCart();

  const priceOfAllItems = cart?.totalPrice;
  const vatAmount = (priceOfAllItems ?? 0) * VAT;

  if (cart.isLoading) {
    return (
      <div className={styles.card}>
        <h2 className={styles.title}>summary</h2>
        <p className={styles.empty}>Loading cart contents...</p>
      </div>
    );
  }

  if (cart?.items?.length === 0) {
    return (
      <div className={styles.card}>
        <h2 className={styles.title}>summary</h2>
        <p className={styles.empty}>Your cart is empty, there is nothing to check out with!</p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>summary</h2>
      <ul className={styles.itemList}>
        {cart?.items?.map((cartItem) => {
          return (
            <ProductSnippet
              key={cartItem.product.id}
              id={cartItem.product.id}
              name={cartItem.product.name}
              price={cartItem.product.price}
              quantity={cartItem.quantity}
              slug={cartItem.product.slug}
            />
          );
        })}
      </ul>
      <div className={styles.linesContainer}>
        <div className={styles.line}>
          <h3 className={styles.lineName}>total</h3>
          <p className={styles.price}>$ {priceOfAllItems?.toLocaleString()}</p>
        </div>
        <div className={styles.line}>
          <h3 className={styles.lineName}>shipping</h3>
          <p className={styles.price}>$ {`${SHIPPING_COST_IN_DOLLARS}`}</p>
        </div>
        <div className={styles.line}>
          <h3 className={styles.lineName}>vat (included)</h3>
          <p className={styles.price}>$ {vatAmount.toLocaleString()}</p>
        </div>
      </div>
      <div className={styles.line}>
        <h3 className={styles.lineName}>grand total</h3>
        <p className={styles.priceAccent}>$ {((priceOfAllItems ?? 0) + SHIPPING_COST_IN_DOLLARS).toLocaleString()}</p>
      </div>

      {children}
    </div>
  );
};

export default CartSummary;
