import styles from "@/styles/pages/Checkout.module.scss";

import { NextPage } from "next";

import CartSummary from "@/components/CheckoutPage/CartSummary";
import CheckoutForm from "@/components/CheckoutPage/CheckoutForm";
import GoBackButton from "@/components/Shared/GoBackButton";
import FormContextProvider from "@/components/CheckoutPage/FormContextProvider";
import CheckoutFormSubmitButton from "@/components/CheckoutPage/CheckoutFormSubmitButton";

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
