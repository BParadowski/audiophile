import { PropsWithChildren, createContext } from "react";

import { useCartId } from "@/components/Cart/useCartId";

export const cartIdContext = createContext<string | null>(null);

const CartIdContextProvider = ({ children }: PropsWithChildren) => {
  const cartId = useCartId();

  return <cartIdContext.Provider value={cartId}>{children}</cartIdContext.Provider>;
};

export default CartIdContextProvider;
