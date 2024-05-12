import styles from "./CheckoutForm.module.scss";

import PayOnDelivery from "@/public/assets/checkout/icon-cash-on-delivery.svg";

import Image from "next/image";
import { useFormContext } from "react-hook-form";

import RadioInput from "@/components/CheckoutPage/RadioInput";
import TextInput from "@/components/CheckoutPage/TextInput";

const CheckoutForm = () => {
  const { watch } = useFormContext();

  const selectedPaymentMethod = watch("paymentMethod");

  return (
    <div className={styles.checkout}>
      <h1 className={styles.heading}>checkout</h1>
      <form>
        <fieldset>
          <legend className="sr-only">billing details</legend>
          <p aria-hidden="true" className={styles.fieldsetTitle}>
            billing details
          </p>

          <div className={styles.gridFieldset}>
            <TextInput field="name" label="Name" placeholder="Alexei Ward" />
            <TextInput field="email" label="Email Adress" placeholder="alexei@mail.com" />
            <TextInput field="phoneNumber" label="Phone Number" placeholder="+1 (202) 555-0136" />
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
              label="Your Address"
              placeholder="1137 Williams Avenue"
            />
            <TextInput field="zipCode" label="Zip Code" placeholder="10001" />
            <TextInput field="city" label="City" placeholder="New York" />
            <TextInput field="country" label="Country" placeholder="United States" />
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
                <TextInput field="cardNumber" label="e-Money Number" placeholder="238521993" />
                <TextInput field="cardPin" label="e-Money PIN" placeholder="6891" />
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
