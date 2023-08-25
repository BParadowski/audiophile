import { forwardRef, ForwardedRef, useContext } from "react";
import styles from "./Cart.module.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartContext } from "../CartContextProvider";
import ProductSnippet from "../Shared/ProductSnippet";
import Link from "next/link";

interface cartProps {
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
  { close }: cartProps,
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
    <div className={styles.container}>
      <div ref={ref} className={styles.dropdown}>
        {cartContentsQuery.data?.length > 0 ? (
          <div className={styles.grid}>
            <p className={styles.title}>
              Cart ({cartContentsQuery.data?.length})
            </p>
            <button
              className={styles.removeAll}
              onClick={() => clearingMutation.mutate()}
            >
              Remove all
            </button>
            <ul className={styles.itemList}>
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
            </ul>
            <p className={styles.total}>total</p>
            <p className={styles.price}>
              ${" "}
              {cartContentsQuery.data
                .reduce((total: number, current: CartItem) => {
                  return total + current.product.price * current.quantity;
                }, 0)
                .toLocaleString()}
            </p>
            <Link href="/checkout">
              <a className={`${styles.checkout} button-accent`} onClick={close}>
                checkout
              </a>
            </Link>
          </div>
        ) : (
          <div className={styles.empty}>
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
