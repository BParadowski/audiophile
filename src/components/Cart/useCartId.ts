import { useEffect, useState } from "react";

export const useCartId = () => {
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

    async function getNewCartId() {
      let response;
      try {
        response = await fetch("/api/carts", { method: "POST" });
      } catch (err) {
        throw err;
      }
      const id: string = await response.json();
      return id;
    }
  }, []);

  return cartId;
};
