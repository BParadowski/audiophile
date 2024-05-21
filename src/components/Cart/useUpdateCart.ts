import { cartIdContext } from "./CartIdContextProvider";
import { cartQueryKey } from "./useCart";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { CartsPatchRequestBody } from "src/pages/api/carts";

export const updateMutationKey = ["update-cart-mutation"];

export const useUpdateCart = () => {
  const cartId = useContext(cartIdContext);
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationKey: updateMutationKey,
    mutationFn: async ({ newQuantity, id }: { newQuantity: number; id: number }) => {
      return await fetch(`/api/carts?id=${cartId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: id,
          quantity: newQuantity,
          action: "update",
        } satisfies CartsPatchRequestBody),
      });
    },

    onMutate: async (mutationObject) => {
      await queryClient.cancelQueries({ queryKey: cartQueryKey });
    },

    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: cartQueryKey });
    },
  });

  const updateCart = updateMutation.mutate;
  const itemBeingUpdated = updateMutation.variables;
  const isPending = updateMutation.isPending;

  return { updateCart, itemBeingUpdated, isPending };
};
