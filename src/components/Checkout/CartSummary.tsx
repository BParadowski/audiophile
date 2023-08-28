import { useQuery } from "@tanstack/react-query";
import styles from "./CartSummary.module.scss";
import { PropsWithChildren, useContext } from "react";
import { cartContext } from "../CartContextProvider";
import ProductSnippet from "../Shared/ProductSnippet";

interface CartItem {
  quantity: number;
  product: {
    name: string;
    id: number;
    slug: string;
    price: number;
  };
}

const CartSummary = ({ children }: PropsWithChildren) => {
  const cartId = useContext(cartContext);

  const fetchCart = () => {
    return fetch("/api/get-cart", {
      method: "POST",
      headers: { "Content-Type": "apllication/json" },
      body: JSON.stringify({ cartId }),
    }).then((res) => res.json());
  };

  const cartContentsQuery = useQuery(["cart-query"], fetchCart, {
    enabled: Boolean(cartId),
  });

  let total = cartContentsQuery.data?.reduce(
    (total: number, current: CartItem) => {
      return total + current.product.price * current.quantity;
    },
    0
  );
  let vat = total * 0.2;

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>summary</h2>
      <ul className={styles.itemList}>
        {cartContentsQuery.data?.map((cartItem: CartItem, index: number) => {
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
          <p className={styles.price}>$ {total && total.toLocaleString()}</p>
        </div>
        <div className={styles.line}>
          <h3 className={styles.lineName}>shipping</h3>
          <p className={styles.price}>$ 50</p>
        </div>
        <div className={styles.line}>
          <h3 className={styles.lineName}>vat (included)</h3>
          <p className={styles.price}>
            ${" "}
            {vat && vat.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>
      <div className={styles.line}>
        <h3 className={styles.lineName}>grand total</h3>
        <p className={styles.priceAccent}>
          $ {total && (total + 50).toLocaleString()}
        </p>
      </div>

      {children}
    </div>
  );
};

export default CartSummary;
