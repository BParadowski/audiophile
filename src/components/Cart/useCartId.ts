import { useEffect, useState } from "react";

export const useCartId = () => {
  const [cartId, setCartId] = useState<null | string>(null);

  useEffect(() => {
    const localCartId = localStorage.getItem("cartId");
    console.log("Initial local CartId: ", localCartId);

    if (localCartId) {
      setCartId(localCartId);
    } else {
      getNewCartId().then((id) => {
        localStorage.setItem("cartId", id);
        setCartId(id);
        console.log(cartId);
      });
    }

    async function getNewCartId() {
      const response = await fetch("/api/carts", { method: "POST" });
      const id: string = await response.json();
      console.log(response);
      return id;
    }
  }, []);

  return cartId;
};
