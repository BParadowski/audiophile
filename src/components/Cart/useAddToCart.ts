import { cartIdContext } from "./CartIdContextProvider";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

export const useAddToCart = () => {
  const cartId = useContext(cartIdContext);
  const queryClient = useQueryClient();

  const addingMutation = useMutation({
    mutationFn: (newItem: { productId: Number; quantity: Number }) => {
      return fetch("/api/add-to-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newItem, cartId }),
      });
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["cart-query"] });
    },
  });

  const addToCart = addingMutation.mutate;
  const isAdding = addingMutation.isPending;

  return { addToCart, isAdding };
};
