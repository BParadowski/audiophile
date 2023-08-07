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

  return (
    <div className={styles.card}>
      <p>summary</p>
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
      {children}
    </div>
  );
};

export default CartSummary;
