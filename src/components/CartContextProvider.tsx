// import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext<null | string>(null);

type Props = {
  children: JSX.Element[] | JSX.Element;
};

const CartContextProvider = ({ children }: Props) => {
  //   const { data: session, status } = useSession();
  const [cartId, setCartId] = useState<null | string>(null);

  useEffect(() => {
    const localCartId = localStorage.getItem("cartId");
    const getNewCartId = async () => {
      const response = await fetch("/api/newCart");
      const id: string = await response.json();
      localStorage.setItem("cartId", id);
      setCartId(id);
    };

    // if (status === "authenticated") {
    //   if (session.cartId) {
    //     setCartId(session.cartId);
    //   } else if (localCartId) {
    //     fetch("/api/bindCart", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ id: localCartId }),
    //     }).then(() => {
    //       localStorage.removeItem("cartId");
    //     });
    //   }
    // }
    if (localCartId) {
      setCartId(localCartId);
      //   if (status !== "loading")
    } else {
      getNewCartId();
    }
  }, []);

  return <cartContext.Provider value={cartId}>{children}</cartContext.Provider>;
};

export default CartContextProvider;
