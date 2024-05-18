import { cartIdContext } from "./CartIdContextProvider";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

export const useClearCart = () => {
  const cartId = useContext(cartIdContext);
  const queryClient = useQueryClient();

  const clearingMutation = useMutation({
    mutationFn: () => {
      return fetch("/api/clear-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId }),
      });
    },

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["cart-query"] });
    },

    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["cart-query"] });
    },
  });

  const clearCart = clearingMutation.mutate;
  const isClearingPending = clearingMutation.isPending;

  return { clearCart, isClearingPending };
};
