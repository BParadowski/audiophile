const fetchCart = (cartId: string) => {
  return fetch("/api/get-cart", {
    method: "POST",
    headers: { "Content-Type": "apllication/json" },
    body: JSON.stringify({ cartId }),
  }).then((res) => res.json());
};

const getCartQO = (cartId: string) => ({
  queryKey: ["cart-query"],
  queryFn: () => fetchCart(cartId),
  enabled: Boolean(cartId),
});

const useCart = (cartId: string | null) => {
  const cartContentsQuery = useQuery(["cart-query"], fetchCart, {
    enabled: Boolean(cartId),
  });
};
