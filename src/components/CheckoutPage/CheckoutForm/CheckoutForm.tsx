import styles from "./CheckoutForm.module.scss";
import OrderConfirmationModal from "./OrderConfirmationModal/OrderConfirmationModal";
import { formHTMLId } from "./formConfig";

import PayOnDelivery from "@/public/assets/checkout/icon-cash-on-delivery.svg";

import Image from "next/image";
import { useState } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { ItemsWithProductDetails } from "src/pages/api/get-cart";

import { useCart } from "@/components/Cart/useCart";
import { useClearCart } from "@/components/Cart/useClearCart";
import RadioInput from "@/components/CheckoutPage/CheckoutForm/Inputs/RadioInput";
import TextInput from "@/components/CheckoutPage/CheckoutForm/Inputs/TextInput";

import { placeNewOrder } from "@/utils/frontend/placeNewOrder";

interface OrderConfirmationModalState {
  open: boolean;
  items: ItemsWithProductDetails;
  grandTotal: number;
}

const CheckoutForm = () => {
  const cart = useCart();
  const { watch, reset, handleSubmit } = useFormContext();
  const [modalState, setModalState] = useState<OrderConfirmationModalState>({ open: false, items: [], grandTotal: 0 });
  const { clearCart } = useClearCart();

  const selectedPaymentMethod = watch("paymentMethod");

  const onSubmit = async (data: FieldValues) => {
    if (!cart?.items || cart.items.length === 0) {
      reset();
      return;
    }

    const result = await placeNewOrder(cart.items, data);

    if (result.success) {
      clearCart();
      reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setModalState({ open: true, items: result.cartItems, grandTotal: result.grandTotal });
      return;
    }
  };

  return (
    <div className={styles.checkout}>
      {modalState.open && <OrderConfirmationModal items={modalState.items} grandTotal={`${modalState.grandTotal}`} />}
      <h1 className={styles.heading}>checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)} id={formHTMLId}>
        <fieldset>
          <legend className="sr-only">billing details</legend>
          <p aria-hidden="true" className={styles.fieldsetTitle}>
            billing details
          </p>

          <div className={styles.gridFieldset}>
            <TextInput field="name" labelText="Name" placeholder="Alexei Ward" />
            <TextInput field="email" labelText="Email Adress" placeholder="alexei@mail.com" />
            <TextInput field="phoneNumber" labelText="Phone Number" placeholder="+1 (202) 555-0136" />
          </div>
        </fieldset>
        <fieldset>
          <legend className="sr-only">shipping info</legend>
          <p aria-hidden="true" className={styles.fieldsetTitle}>
            shipping info
          </p>
          <div className={styles.gridFieldset}>
            <TextInput
              className={styles.wide}
              field="address"
              labelText="Your Address"
              placeholder="1137 Williams Avenue"
            />
            <TextInput field="zipCode" labelText="Zip Code" placeholder="10001" />
            <TextInput field="city" labelText="City" placeholder="New York" />
            <TextInput field="country" labelText="Country" placeholder="United States" />
          </div>
        </fieldset>
        <fieldset>
          <legend className="sr-only">payment details</legend>
          <p aria-hidden="true" className={styles.fieldsetTitle}>
            payment details
          </p>
          <div className={styles.gridFieldset}>
            <p className={styles.paymentTitle}>Payment Method</p>
            <div className={styles.radios}>
              <RadioInput field="paymentMethod" value="card" text="e-Money" />
              <RadioInput field="paymentMethod" value="cash" text="Cash on Delivery" />
            </div>

            {selectedPaymentMethod === "card" ? (
              <>
                <TextInput field="cardNumber" labelText="e-Money Number" placeholder="238521993" />
                <TextInput field="cardPin" labelText="e-Money PIN" placeholder="6891" />
              </>
            ) : (
              <div className={styles.cashMessage}>
                <Image src={PayOnDelivery} alt=""></Image>
                <p>
                  The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your
                  residence. Just make sure your address is correct so that your order will not be cancelled.
                </p>
              </div>
            )}
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default CheckoutForm;
