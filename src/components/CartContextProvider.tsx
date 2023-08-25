import { createContext, useEffect, useState } from "react";

export const cartContext = createContext<null | string>(null);

type Props = {
  children: JSX.Element[] | JSX.Element;
};

const CartContextProvider = ({ children }: Props) => {
  const [cartId, setCartId] = useState<null | string>(null);

  useEffect(() => {
    const localCartId = localStorage.getItem("cartId");
    const getNewCartId = async () => {
      const response = await fetch("/api/new-cart");
      const id: string = await response.json();
      localStorage.setItem("cartId", id);
      setCartId(id);
    };

    if (localCartId) {
      setCartId(localCartId);
    } else {
      getNewCartId();
    }
  }, []);

  return <cartContext.Provider value={cartId}>{children}</cartContext.Provider>;
};

export default CartContextProvider;
