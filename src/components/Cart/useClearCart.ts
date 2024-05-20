import { cartIdContext } from "./CartIdContextProvider";
import { cartQueryKey } from "./useCart";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

export const useClearCart = () => {
  const cartId = useContext(cartIdContext);
  const queryClient = useQueryClient();

  const clearingMutation = useMutation({
    mutationFn: async () => {
      return fetch(`/api/carts?id=${cartId}`, {
        method: "DELETE",
      });
    },

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: cartQueryKey });
    },

    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: cartQueryKey });
    },
  });

  const clearCart = clearingMutation.mutate;
  const isClearingPending = clearingMutation.isPending;

  return { clearCart, isClearingPending };
};
