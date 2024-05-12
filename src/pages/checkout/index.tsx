import styles from "@/styles/pages/Checkout.module.scss";

import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";

import { CartItem } from "@/components/CartContextProvider";
import { cartContext } from "@/components/CartContextProvider";
import CartSummary from "@/components/CheckoutPage/CartSummary";
import CheckoutForm from "@/components/CheckoutPage/CheckoutForm";
import OrderConfirmationModal from "@/components/CheckoutPage/OrderConfirmationModal";
import { FormField, FormSchemaType, formSchema } from "@/components/CheckoutPage/formSchema";
import GoBackButton from "@/components/Shared/GoBackButton";

const Checkout: NextPage = () => {
  const formMethodsAndProperties = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      zipCode: "",
      city: "",
      country: "",
      paymentMethod: "card",
      cardNumber: "",
      cardPin: "",
    },
  });

  const {
    watch,
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful, isSubmitting },
  } = formMethodsAndProperties;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalItems, setModalItems] = useState<CartItem[] | undefined>([]);
  const [grandTotal, setGrandTotal] = useState<string | undefined>("$ 0");
  const cart = useContext(cartContext);

  useEffect(() => {
    if (isSubmitSuccessful) {
      setModalItems(cart?.items);
      setGrandTotal(cart?.priceWithShipping);
      setModalOpen(true);
      cart?.clearCart();
      reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isSubmitSuccessful]);

  const selectedPaymentMethod = watch("paymentMethod");

  const submitForm = handleSubmit(async (data) => {
    const itemsAbr = cart?.items?.map((item) => {
      return { itemId: item.product.id, quantity: item.quantity };
    });

    await fetch("/api/new-order", {
      method: "POST",
      headers: { "Content-Type": "apllication/json" },
      body: JSON.stringify({ ...data, items: itemsAbr }),
    }).then((res) => res.json());
  });

  return (
    <main className={styles.background}>
      <div className="container">
        <GoBackButton />
        <div className={styles.layout}>
          <FormProvider {...formMethodsAndProperties}>
            <CheckoutForm />

            <CartSummary>
              {isSubmitting ? (
                <button className="button-accent" type="button">
                  Placing order...
                </button>
              ) : (
                <button className="button-accent" type="submit" onClick={() => submitForm()}>
                  {selectedPaymentMethod === "card" ? "continue & pay" : "continue"}
                </button>
              )}
            </CartSummary>
            {modalOpen && <OrderConfirmationModal items={modalItems ?? []} grandTotal={grandTotal ?? "$ 0"} />}
          </FormProvider>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
