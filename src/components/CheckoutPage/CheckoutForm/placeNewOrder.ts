import { FieldValues } from "react-hook-form";
import { SHIPPING_COST_IN_DOLLARS } from "src/constants/constants";
import { ItemsWithProductDetails } from "src/pages/api/get-cart";

export const placeNewOrder = async (cartItems: ItemsWithProductDetails, formData: FieldValues) => {
  const apiRes = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formData, items: cartItems }),
  }).then((res) => res.json());

  if (apiRes.success) {
    const grandTotal = cartItems.reduce((acc, c) => {
      return acc + c.quantity * c.product.price + SHIPPING_COST_IN_DOLLARS;
    }, 0);

    return { cartItems, success: true, grandTotal };
  } else {
    return { cartItems: [], success: false, grandTotal: 0 };
  }
};
