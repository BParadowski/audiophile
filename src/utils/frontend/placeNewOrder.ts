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
    const grandTotal = cartItems.reduce((acc, c) => {
      return acc + c.quantity * c.product.price;
    }, 0);

    return { cartItems, success: true, grandTotal };
  } else {
    return { cartItems: [], success: false, grandTotal: 0 };
  }
};
