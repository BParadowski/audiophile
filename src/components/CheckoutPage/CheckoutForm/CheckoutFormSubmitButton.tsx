import { formHTMLId } from "./formConfig";

import { useMutationState } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";

import { updateMutationKey } from "@/components/Cart/useUpdateCart";
import Button from "@/components/Shared/Button";

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
      <Button theme="accent" type="button">
        Updating cart...
      </Button>
    );
  } else if (isSubmitting) {
    return (
      <Button theme="accent" type="button">
        Placing order...
      </Button>
    );
  } else {
    return (
      <Button theme="accent" type="submit" form={formHTMLId}>
        {selectedPaymentMethod === "card" ? "continue & pay" : "continue"}
      </Button>
    );
  }
};

export default CheckoutFormSubmitButton;
