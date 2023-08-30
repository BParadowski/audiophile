import styles from "./CartSummary.module.scss";
import { PropsWithChildren, useContext } from "react";
import { cartContext } from "../CartContextProvider";
import ProductSnippet from "../Shared/ProductSnippet";

const CartSummary = ({ children }: PropsWithChildren) => {
  const cart = useContext(cartContext);

  if (cart?.numberOfItems === 0) {
    return (
      <div className={styles.card}>
        <h2 className={styles.title}>summary</h2>
        <p>Your cart is empty, there is nothing to check out with!</p>
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
              displayOnly={true}
            />
          );
        })}
      </ul>
      <div className={styles.linesContainer}>
        <div className={styles.line}>
          <h3 className={styles.lineName}>total</h3>
          <p className={styles.price}>$ {cart?.totalPrice}</p>
        </div>
        <div className={styles.line}>
          <h3 className={styles.lineName}>shipping</h3>
          <p className={styles.price}>$ 50</p>
        </div>
        <div className={styles.line}>
          <h3 className={styles.lineName}>vat (included)</h3>
          <p className={styles.price}>$ {cart?.vat}</p>
        </div>
      </div>
      <div className={styles.line}>
        <h3 className={styles.lineName}>grand total</h3>
        <p className={styles.priceAccent}>$ {cart?.priceWithShipping}</p>
      </div>

      {children}
    </div>
  );
};

export default CartSummary;
