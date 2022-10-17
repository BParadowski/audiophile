import styles from "./ProductSnippet.module.scss";
import Image from "next/future/image";
import { useContext } from "react";
import { cartContext } from "../CartContextProvider";
import Counter from "../Shared/Counter";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SnippetProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  slug: string;
}

interface CartItem {
  quantity: number;
  product: {
    name: string;
    id: number;
    slug: string;
    price: number;
  };
}

const ProductSnippet = ({ id, name, price, quantity, slug }: SnippetProps) => {
  const cartId = useContext(cartContext);
  const queryClient = useQueryClient();

  const updateCart = ({ newQuantity }: { newQuantity: number }) => {
    return fetch("/api/update-cart", {
      method: "POST",
      headers: { "Content-Type": "apllication/json" },
      body: JSON.stringify({ cartId, productId: id, newQuantity }),
    });
  };

  const updateMutation = useMutation(updateCart, {
    onMutate: async (mutationObject) => {
      await queryClient.cancelQueries(["cart-query"]);

      if (mutationObject.newQuantity > 0) {
        queryClient.setQueryData<CartItem[]>(["cart-query"], (oldCart) =>
          oldCart?.map((item) => {
            if (item.product.id !== id) return item;
            else {
              return {
                quantity: mutationObject.newQuantity,
                product: {
                  id,
                  slug,
                  name,
                  price,
                },
              };
            }
          })
        );
      } else {
        queryClient.setQueryData<CartItem[]>(["cart-query"], (oldCart) => {
          return oldCart?.filter((item) => item.product.id !== id);
        });
      }
    },
    onError: async () => {
      queryClient.invalidateQueries(["cart-query"]);
    },
  });

  return (
    <div className={styles.grid}>
      <Image
        src={`/assets/cart/image-${slug}.jpg`}
        alt=""
        className={styles["product-image"]}
        width={150}
        height={150}
      />
      <p className={styles.name}>
        {name.replaceAll(/headphones|earphones|speaker|wireless/gi, "")}
      </p>
      <p className={styles.price}>{`$ ${price}`}</p>
      <Counter
        number={quantity}
        className={styles.counter}
        onMinusClick={() =>
          updateMutation.mutate({ newQuantity: quantity - 1 })
        }
        onPlusClick={() => updateMutation.mutate({ newQuantity: quantity + 1 })}
      />
    </div>
  );
};

export default ProductSnippet;
