import { forwardRef, ForwardedRef, useContext } from "react";
import styles from "./Cart.module.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartContext } from "../CartContextProvider";
import ProductSnippet from "../Shared/ProductSnippet";
import Link from "next/link";

interface navProps {
  close: () => void;
}

interface CartItem {
  quantity: number;
  product: {
    name: string;
    id: number;
    slug: string;
    price: number;
  };
}

const Cart = forwardRef(function MobileNav(
  { close }: navProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const cartId = useContext(cartContext);
  const queryClient = useQueryClient();

  const fetchCart = () => {
    return fetch("/api/get-cart", {
      method: "POST",
      headers: { "Content-Type": "apllication/json" },
      body: JSON.stringify({ cartId }),
    }).then((res) => res.json());
  };

  const clearCart = () => {
    return fetch("/api/clear-cart", {
      method: "POST",
      headers: { "Content-Type": "apllication/json" },
      body: JSON.stringify({ cartId }),
    });
  };

  const cartContentsQuery = useQuery(["cart-query"], fetchCart, {
    enabled: Boolean(cartId),
  });

  const clearingMutation = useMutation(["cart-query"], clearCart, {
    onSuccess: async () => {
      await queryClient.setQueryData(["cart-query"], []);
    },
  });

  return (
    <div className={styles["cart-container"]}>
      <div ref={ref} className={styles["cart-dropdown"]}>
        {cartContentsQuery.data?.length > 0 ? (
          <div className={styles["cart-grid"]}>
            <p className={styles["cart-title"]}>
              Cart ({cartContentsQuery.data?.length})
            </p>
            <button
              className={styles["cart-remove"]}
              onClick={() => clearingMutation.mutate()}
            >
              Remove all
            </button>
            <div className={styles["cart-item-list"]}>
              {cartContentsQuery.data.map(
                (cartItem: CartItem, index: number) => {
                  if (index < 8) {
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
                  } else return null;
                }
              )}
            </div>
            <p className={styles["cart-total"]}>total</p>
            <p className={styles["cart-price"]}>
              ${" "}
              {cartContentsQuery.data.reduce(
                (total: number, current: CartItem) => {
                  return total + current.product.price * current.quantity;
                },
                0
              )}
            </p>
            <Link href="/">
              <a className={`${styles["cart-checkout"]} button-accent`}>
                checkout
              </a>
            </Link>
          </div>
        ) : (
          <div className={styles["cart-empty-layout"]}>
            <p>Your cart is empty.</p>
            <button onClick={close} className="button-accent">
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

export default Cart;
