import { cartIdContext } from "./CartIdContextProvider";

import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ItemsWithProductDetails } from "src/pages/api/carts";

export const cartQueryKey = ["cart-query"];

export const useCart = () => {
  const cartId = useContext(cartIdContext);

  const { data } = useQuery({
    queryKey: cartQueryKey,
    queryFn: async ({ signal }) => {
      try {
        const res = await fetch(`/api/carts?id=${cartId}`, { signal });
        return res.json() as Promise<ItemsWithProductDetails>;
      } catch (err) {
        throw new Error(JSON.stringify(err));
      }
    },
    enabled: Boolean(cartId),
  });

  const items = data;

  const totalPrice = items?.reduce((total, current) => {
    return total + current.product.price * current.quantity;
  }, 0);

  return { items, totalPrice };
};
