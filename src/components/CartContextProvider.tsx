import { createContext, useEffect, useState } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

export const cartContext = createContext<null | CartContextObject>(null);

export interface CartItem {
  quantity: number;
  product: {
    name: string;
    id: number;
    slug: string;
    price: number;
  };
}

interface CartContextObject {
  items: CartItem[] | undefined;
  numberOfItems: number;
  totalPrice: string;
  priceWithShipping: string;
  vat: string;
  clearCart: () => void;
  updateItem: (id: number, newQuantity: number) => void;
  addItem: (id: number, quantity: number) => void;
  addingProduct: boolean;
}

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

  const queryClient = useQueryClient();

  const fetchCart = () => {
    return fetch("/api/get-cart", {
      method: "POST",
      headers: { "Content-Type": "apllication/json" },
      body: JSON.stringify({ cartId }),
    }).then((res) => res.json());
  };

  const clearCart = () => {
    return fetch("/api/clear-cart", {
      method: "POST",
      headers: { "Content-Type": "apllication/json" },
      body: JSON.stringify({ cartId }),
    });
  };

  const cartContentsQuery = useQuery(["cart-query"], fetchCart, {
    enabled: Boolean(cartId),
  });

  const clearingMutation = useMutation(["cart-query"], {
    mutationFn: clearCart,

    onMutate: () => {
      queryClient.setQueryData(["cart-query"], []);
    },
    onError: () => {
      queryClient.invalidateQueries(["cart-query"]);
    },
  });

  const updateCart = ({
    newQuantity,
    id,
  }: {
    newQuantity: number;
    id: number;
  }) => {
    return fetch("/api/update-cart", {
      method: "POST",
      headers: { "Content-Type": "apllication/json" },
      body: JSON.stringify({
        cartId: cartId,
        productId: id,
        newQuantity: newQuantity,
      }),
    });
  };

  const updateMutation = useMutation({
    mutationFn: updateCart,
    onMutate: async (mutationObject) => {
      await queryClient.cancelQueries(["cart-query"]);

      // optimistic update
      if (mutationObject.newQuantity > 0) {
        queryClient.setQueryData<CartItem[]>(["cart-query"], (oldCart) =>
          oldCart?.map((item) => {
            if (item.product.id !== mutationObject.id) return item;
            else {
              return { ...item, quantity: mutationObject.newQuantity };
            }
          })
        );
      } else {
        queryClient.setQueryData<CartItem[]>(["cart-query"], (oldCart) => {
          return oldCart?.filter(
            (item) => item.product.id !== mutationObject.id
          );
        });
      }
    },
    onError: async () => {
      queryClient.invalidateQueries(["cart-query"]);
    },
  });

  const addToCart = (newItem: { productId: Number; quantity: Number }) => {
    return fetch("/api/add-to-cart", {
      method: "POST",
      headers: { "Content-Type": "apllication/json" },
      body: JSON.stringify({ ...newItem, cartId }),
    });
  };

  const addingMutation = useMutation(addToCart, {
    onSuccess: async () => {
      await queryClient.refetchQueries(["cart-query"], { type: "all" });
    },
  });

  const totalPrice = cartContentsQuery.data?.reduce(
    (total: number, current: CartItem) => {
      return total + current.product.price * current.quantity;
    },
    0
  );

  const cart: CartContextObject = {
    clearCart: () => {
      clearingMutation.mutate();
    },
    items: cartContentsQuery.data,
    numberOfItems: cartContentsQuery.data?.length,
    totalPrice: totalPrice?.toLocaleString(),
    priceWithShipping: (totalPrice + 50).toLocaleString(),
    vat: (totalPrice * 0.2).toLocaleString(),
    updateItem: (id: number, newQuantity: number) => {
      updateMutation.mutate({ newQuantity, id });
    },
    addItem: (productId: number, quantity: number) => {
      addingMutation.mutate({ productId, quantity });
    },
    addingProduct: addingMutation.isLoading,
  };

  return <cartContext.Provider value={cart}>{children}</cartContext.Provider>;
};

export default CartContextProvider;
