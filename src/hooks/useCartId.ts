import { useEffect, useState } from "react";

export default function useCartId() {
  const [cartId, setCartId] = useState<null | string>(null);

  async function getNewCartId() {
    const response = await fetch("/api/new-cart");
    const id: string = await response.json();
    localStorage.setItem("cartId", id);
    setCartId(id);
  }

  useEffect(() => {
    const localCartId = localStorage.getItem("cartId");
    if (localCartId) {
      setCartId(localCartId);
    } else {
      getNewCartId();
    }
  }, []);

  return cartId;
}
