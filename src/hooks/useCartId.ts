import { useEffect, useState } from "react";

export default function useCartId() {
  const [cartId, setCartId] = useState<null | string>(null);

  useEffect(() => {
    const localCartId = localStorage.getItem("cartId");

    if (localCartId) {
      setCartId(localCartId);
    } else {
      getNewCartId().then((id) => {
        localStorage.setItem("cartId", id);
        setCartId(id);
      });
    }
  }, []);

  async function getNewCartId() {
    const response = await fetch("/api/new-cart");
    const id: string = await response.json();
    return id;
  }

  return cartId;
}
