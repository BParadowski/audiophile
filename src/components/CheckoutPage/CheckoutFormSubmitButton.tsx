import { useFormContext } from "react-hook-form";
import { formHTMLId } from "./formConfig";

const CheckoutFormSubmitButton = () => {
  const {
    formState: { isSubmitting },
    watch,
  } = useFormContext();

  const selectedPaymentMethod = watch("paymentMethod");

  return isSubmitting ? (
    <button className="button-accent" type="button">
      Placing order...
    </button>
  ) : (
    <button className="button-accent" type="submit" form={formHTMLId}>
      {selectedPaymentMethod === "card" ? "continue & pay" : "continue"}
    </button>
  );
};

export default CheckoutFormSubmitButton;
