import { cartIdContext } from "./CartIdContextProvider";

import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ItemsWithProductDetails } from "src/pages/api/get-cart";

export const useCart = () => {
  const cartId = useContext(cartIdContext);

  const { data } = useQuery({
    queryKey: ["cart-query", cartId],
    queryFn: async () =>
      (await fetch("/api/get-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId }),
      }).then((res) => {
        return res.json();
      })) as ItemsWithProductDetails,
    enabled: Boolean(cartId),
  });

  const items = data;

  const totalPrice = items?.reduce((total, current) => {
    return total + current.product.price * current.quantity;
  }, 0);

  return { items, totalPrice };
};
