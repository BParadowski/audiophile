import { cartIdContext } from "./CartIdContextProvider";
import { cartQueryKey } from "./useCart";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { CartsPatchRequestBody } from "src/pages/api/carts";

export const useAddToCart = () => {
  const cartId = useContext(cartIdContext);
  const queryClient = useQueryClient();

  const addingMutation = useMutation({
    mutationFn: (newItem: { productId: number; quantity: number }) => {
      return fetch(`/api/carts?id=${cartId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newItem, action: "add" } satisfies CartsPatchRequestBody),
      });
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: cartQueryKey });
    },
  });

  const addToCart = addingMutation.mutate;
  const isAdding = addingMutation.isPending;

  return { addToCart, isAdding };
};
