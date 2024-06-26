import styles from "./OrderConfirmationModal.module.scss";

import Confirmation from "@/public/assets/checkout/icon-order-confirmation.svg";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";
import { ItemsWithProductDetails } from "src/pages/api/carts";

import Button from "@/components/Shared/Button";
import ProductSnippet from "@/components/Shared/ProductSnippet";

const OrderConfirmationModal = ({ items, grandTotal }: { items: ItemsWithProductDetails; grandTotal: number }) => {
  const numberOfItems = items.length;
  const [numberDisplayed, setNumberDisplayed] = useState(1);

  let itemsHidden = numberOfItems - numberDisplayed;

  return (
    <>
      {createPortal(
        <>
          <div className={styles.backdrop}></div>
          <div className={styles.card} role="alertdialog">
            <Image src={Confirmation} alt="A check mark"></Image>
            <h2 className={styles.thankYou}>
              thank you <br></br> for your order
            </h2>
            <p className={styles.info}>You will receive an email confirmation shortly.</p>
            <div className={styles.innerCard}>
              <div className={styles.list}>
                <ul>
                  {items &&
                    items.map((cartItem, index) => {
                      if (index + 1 <= numberDisplayed) {
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
                      }
                    })}
                </ul>
                {itemsHidden > 0 && (
                  <button className={styles.showMore} onClick={() => setNumberDisplayed(numberOfItems)}>
                    <p>
                      and {itemsHidden} other item{itemsHidden > 1 && "s"}
                    </p>
                  </button>
                )}
                {itemsHidden === 0 && numberOfItems > 1 && (
                  <button className={styles.showMore} onClick={() => setNumberDisplayed(1)}>
                    <p>View less</p>
                  </button>
                )}
              </div>
              <div className={styles.totalBox}>
                <p className={styles.totalTitle}>grand total</p>
                <p className={styles.totalNumber}>$ {grandTotal.toLocaleString()}</p>
              </div>
            </div>

            <Button as="Link" href="/" theme="accent">
              back to home
            </Button>
          </div>
        </>,
        document.body,
      )}
    </>
  );
};

export default OrderConfirmationModal;
