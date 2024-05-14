import styles from "@/styles/pages/Checkout.module.scss";

import { NextPage } from "next";

import CartSummary from "@/components/CheckoutPage/CartSummary";
import CheckoutForm from "@/components/CheckoutPage/CheckoutForm/CheckoutForm";
import CheckoutFormSubmitButton from "@/components/CheckoutPage/CheckoutForm/CheckoutFormSubmitButton";
import FormContextProvider from "@/components/CheckoutPage/CheckoutForm/FormContextProvider";
import GoBackButton from "@/components/Shared/GoBackButton";

const Checkout: NextPage = () => {
  return (
    <main className={styles.background}>
      <div className="container">
        <GoBackButton />
        <div className={styles.layout}>
          <FormContextProvider>
            <CheckoutForm />
            <CartSummary>
              <CheckoutFormSubmitButton />
            </CartSummary>
          </FormContextProvider>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
