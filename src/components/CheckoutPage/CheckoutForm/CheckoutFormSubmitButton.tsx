import { formHTMLId } from "./formConfig";

import { useMutationState } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";

import { updateMutationKey } from "@/components/Cart/useUpdateCart";

const CheckoutFormSubmitButton = () => {
  const {
    formState: { isSubmitting },
    watch,
  } = useFormContext();

  const cartUpdatePending =
    useMutationState({
      filters: { mutationKey: updateMutationKey },
      select: (mutation) => mutation.state.status,
    }).at(-1) === "pending";

  const selectedPaymentMethod = watch("paymentMethod");

  if (cartUpdatePending) {
    return (
      <button className="button-accent" type="button">
        Updating cart...
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
