import { cartIdContext } from "./CartIdContextProvider";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

export const useUpdateCart = () => {
  const cartId = useContext(cartIdContext);
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ newQuantity, id }: { newQuantity: number; id: number }) => {
      return fetch("/api/update-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId: cartId,
          productId: id,
          newQuantity: newQuantity,
        }),
      });
    },

    onMutate: async (mutationObject) => {
      await queryClient.cancelQueries({ queryKey: ["cart-query"] });
    },

    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["cart-query"] });
    },
  });

  const updateCart = updateMutation.mutate;
  const itemBeingUpdated = updateMutation.variables;
  const isPending = updateMutation.isPending;

  return { updateCart, itemBeingUpdated, isPending };
};
