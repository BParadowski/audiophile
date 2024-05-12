import Image from "next/image";
import Confirmation from "../../../public/assets/checkout/icon-order-confirmation.svg";
import Link from "next/link";
import styles from "./OrderConfirmationModal.module.scss";
import { createPortal } from "react-dom";
import { CartItem } from "../CartContextProvider";
import ProductSnippet from "../Shared/ProductSnippet";
import { useState } from "react";

const OrderConfirmationModal = ({
  items,
  grandTotal,
}: {
  items: CartItem[];
  grandTotal: string;
}) => {
  const numberOfItems = items.length;
  const [numberDisplayed, setNumberDisplayed] = useState(1);

  let itemsHidden = numberOfItems - numberDisplayed;

  return (
    <>
      {createPortal(
        <>
          <div className={styles.backdrop}></div>
          <div className={styles.card}>
            <Image src={Confirmation} alt="A check mark"></Image>
            <h2 className={styles.thankYou}>
              thank you <br></br> for your order
            </h2>
            <p>You will receive an email confirmation shortly.</p>
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
                            displayOnly={true}
                          />
                        );
                      }
                    })}
                </ul>
                {itemsHidden > 0 && (
                  <button
                    className={styles.showMore}
                    onClick={() => setNumberDisplayed(numberOfItems)}
                  >
                    <p>
                      and {itemsHidden} other item{itemsHidden > 1 && "s"}
                    </p>
                  </button>
                )}
                {itemsHidden === 0 && numberOfItems > 1 && (
                  <button
                    className={styles.showMore}
                    onClick={() => setNumberDisplayed(1)}
                  >
                    <p>View less</p>
                  </button>
                )}
              </div>
              <div className={styles.totalBox}>
                <p className={styles.totalTitle}>grand total</p>
                <p className={styles.totalNumber}>$ {grandTotal}</p>
              </div>
            </div>

            <Link href="/">
              <a className="button-accent">back to home</a>
            </Link>
          </div>
        </>,
        document.body
      )}
    </>
  );
};

export default OrderConfirmationModal;
