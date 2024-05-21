import { useCart } from "../Cart/useCart";
import { useClearCart } from "../Cart/useClearCart";
import { useUpdateCart } from "../Cart/useUpdateCart";
import Button from "../Shared/Button";
import styles from "./Cart.module.scss";

import Link from "next/link";
import { ForwardedRef, forwardRef, useCallback } from "react";

import ProductSnippet from "@/components/Shared/ProductSnippet";

interface cartProps {
  close: () => void;
}

const Cart = forwardRef(function MobileNav({ close }: cartProps, ref: ForwardedRef<HTMLDivElement>) {
  const cart = useCart();
  const { clearCart, isClearingPending } = useClearCart();
  const { updateCart, itemBeingUpdated, isPending } = useUpdateCart();

  const onClearCartClick = useCallback(() => clearCart(), [clearCart]);

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
      <div ref={ref} className={styles.dropdown} role="alertdialog">
        {shouldRenderItemList ? (
          <div className={styles.grid}>
            <p className={styles.title}>
              Cart{" "}
              <span className={itemBeingUpdated?.newQuantity === 0 && isPending === true ? styles.gray : ""}>
                ({cart.items?.length})
              </span>
            </p>
            <button className={styles.removeAll} onClick={onClearCartClick}>
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
                        withCounter
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
                      withCounter
                      onMinusClick={() => updateCart({ id: cartItem.product.id, newQuantity: cartItem.quantity - 1 })}
                      onPlusClick={() => updateCart({ id: cartItem.product.id, newQuantity: cartItem.quantity + 1 })}
                    />
                  );
                } else return null;
              })}
            </ul>
            <p className={styles.total}>total</p>
            <p
              className={`${styles.price} ${isPending ? styles.gray : ""}`}
            >{`$ ${cart.totalPrice?.toLocaleString()}`}</p>
            <Button as="Link" href="/checkout" theme="accent" className={styles.checkout} onClick={close}>
              checkout
            </Button>
          </div>
        ) : (
          <div className={styles.empty}>
            <p>Your cart is empty.</p>
            <Button onClick={close} theme="accent">
              Continue shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
});

export default Cart;
