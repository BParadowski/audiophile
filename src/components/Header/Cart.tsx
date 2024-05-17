import { useCart } from "../Cart/useCart";
import { useClearCart } from "../Cart/useClearCart";
import { useUpdateCart } from "../Cart/useUpdateCart";
import styles from "./Cart.module.scss";

import Link from "next/link";
import { ForwardedRef, forwardRef } from "react";

import ProductSnippet from "@/components/Shared/ProductSnippet";

interface cartProps {
  close: () => void;
}

const Cart = forwardRef(function MobileNav({ close }: cartProps, ref: ForwardedRef<HTMLDivElement>) {
  const cart = useCart();
  const { clearCart, isClearingPending } = useClearCart();
  const { updateCart, itemBeingUpdated } = useUpdateCart();

  const shouldRenderItemList =
    !isClearingPending &&
    Boolean(cart) &&
    cart.items?.length &&
    cart.items.length > 0 &&
    !(
      cart.items.length === 1 &&
      itemBeingUpdated?.newQuantity === 0 &&
      cart.items[0].product.id === itemBeingUpdated.id
    );

  return (
    <div className={styles.container}>
      <div ref={ref} className={styles.dropdown}>
        {shouldRenderItemList ? (
          <div className={styles.grid}>
            <p className={styles.title}>Cart ({cart.items?.length})</p>
            <button className={styles.removeAll} onClick={() => clearCart()}>
              Remove all
            </button>
            <ul className={styles.itemList}>
              {cart.items?.map((cartItem, index) => {
                if (itemBeingUpdated && itemBeingUpdated.id === cartItem.product.id) {
                  if (itemBeingUpdated.newQuantity > 0) {
                    return (
                      <ProductSnippet
                        key={cartItem.product.id}
                        id={cartItem.product.id}
                        name={cartItem.product.name}
                        price={cartItem.product.price}
                        quantity={itemBeingUpdated.newQuantity}
                        slug={cartItem.product.slug}
                        onMinusClick={() =>
                          updateCart({ id: cartItem.product.id, newQuantity: itemBeingUpdated.newQuantity - 1 })
                        }
                        onPlusClick={() =>
                          updateCart({ id: cartItem.product.id, newQuantity: itemBeingUpdated.newQuantity + 1 })
                        }
                      />
                    );
                  } else return null;
                }

                if (index < 8) {
                  return (
                    <ProductSnippet
                      key={cartItem.product.id}
                      id={cartItem.product.id}
                      name={cartItem.product.name}
                      price={cartItem.product.price}
                      quantity={cartItem.quantity}
                      slug={cartItem.product.slug}
                      onMinusClick={() => updateCart({ id: cartItem.product.id, newQuantity: cartItem.quantity - 1 })}
                      onPlusClick={() => updateCart({ id: cartItem.product.id, newQuantity: cartItem.quantity + 1 })}
                    />
                  );
                } else return null;
              })}
            </ul>
            <p className={styles.total}>total</p>
            <p className={styles.price}>$ {cart.totalPrice}</p>
            <Link href="/checkout" className={`${styles.checkout} button-accent`} onClick={close}>
              checkout
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
