import { FieldValues } from "react-hook-form";

import { CartItemWithQuantity } from "@/components/CartContextProvider";

export const placeNewOrder = async (cartItems: CartItemWithQuantity[], formData: FieldValues) => {
  const itemsAbr = cartItems?.map((item) => {
    return { itemId: item.product.id, quantity: item.quantity };
  });

  const apiRes = await fetch("/api/new-order", {
    method: "POST",
    headers: { "Content-Type": "apllication/json" },
    body: JSON.stringify({ ...formData, items: itemsAbr }),
  }).then((res) => res.json());

  if (apiRes.success) {
    return { cartItems, success: true };
  } else {
    return { cartItems: undefined, success: false };
  }
};
