import { formHTMLId } from "./formConfig";

import { useFormContext } from "react-hook-form";

import { useCart } from "@/components/Cart/useCart";

const CheckoutFormSubmitButton = () => {
  const {
    formState: { isSubmitting },
    watch,
  } = useFormContext();
  const cart = useCart();

  const selectedPaymentMethod = watch("paymentMethod");

  if (cart.isFetching) {
    return (
      <button className="button-accent" type="button">
        Loading cart...
      </button>
    );
  } else if (isSubmitting) {
    return (
      <button className="button-accent" type="button">
        Placing order...
      </button>
    );
  } else {
    return (
      <button className="button-accent" type="submit" form={formHTMLId}>
        {selectedPaymentMethod === "card" ? "continue & pay" : "continue"}
      </button>
    );
  }
};

export default CheckoutFormSubmitButton;
