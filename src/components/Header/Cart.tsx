import { forwardRef, ForwardedRef, useContext } from "react";
import styles from "./Cart.module.scss";
import { cartContext } from "../CartContextProvider";
import ProductSnippet from "../Shared/ProductSnippet";
import Link from "next/link";

interface cartProps {
  close: () => void;
}

const Cart = forwardRef(function MobileNav(
  { close }: cartProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const cart = useContext(cartContext);

  return (
    <div className={styles.container}>
      <div ref={ref} className={styles.dropdown}>
        {cart && cart.items?.length && cart.items.length > 0 ? (
          <div className={styles.grid}>
            <p className={styles.title}>Cart ({cart.items?.length})</p>
            <button
              className={styles.removeAll}
              onClick={() => cart.clearCart()}
            >
              Remove all
            </button>
            <ul className={styles.itemList}>
              {cart.items?.map((cartItem, index: number) => {
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
              })}
            </ul>
            <p className={styles.total}>total</p>
            <p className={styles.price}>$ {cart.totalPrice}</p>
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
