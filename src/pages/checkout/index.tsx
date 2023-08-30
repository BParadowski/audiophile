import GoBackButton from "../../components/Shared/GoBackButton";
import styles from "../../styles/pages/Checkout.module.scss";
import CartSummary from "../../components/Checkout/CartSummary";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TextInput from "../../components/Checkout/TextInput";
import Image from "next/future/image";
import PayOnDelivery from "../../../public/assets/checkout/icon-cash-on-delivery.svg";
import OrderConfirmationModal from "../../components/Checkout/OrderConfirmationModal";
import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../components/CartContextProvider";
import { CartItem } from "../../components/CartContextProvider";

const formSchemaCash = z.object({
  name: z.string().nonempty({ message: "Cannot be empty" }),
  email: z
    .string()
    .nonempty({ message: "Cannot be empty" })
    .email({ message: "Invalid format" }),
  phoneNumber: z.string().nonempty({ message: "Cannot be empty" }),
  address: z.string().nonempty({ message: "Cannot be empty" }),
  zipCode: z
    .string()
    .nonempty({ message: "Cannot be empty" })
    .regex(/^\d+$/, { message: "Must contain digits only" })
    .length(5, { message: "Must be 5 digits long" }),
  city: z.string().nonempty({ message: "Cannot be empty" }),
  country: z.string().nonempty({ message: "Cannot be empty" }),
  paymentMethod: z.literal("cash"),
});

const formSchemaCard = z.object({
  name: z.string().nonempty({ message: "Cannot be empty" }),
  email: z
    .string()
    .nonempty({ message: "Cannot be empty" })
    .email({ message: "Invalid format" }),
  phoneNumber: z.string().nonempty({ message: "Cannot be empty" }),
  address: z.string().nonempty({ message: "Cannot be empty" }),
  zipCode: z
    .string()
    .nonempty({ message: "Cannot be empty" })
    .regex(/^\d+$/, { message: "Must contain digits only" })
    .length(5, { message: "Must be 5 digits long" }),
  city: z.string().nonempty({ message: "Cannot be empty" }),
  country: z.string().nonempty({ message: "Cannot be empty" }),
  paymentMethod: z.literal("card"),
  cardNumber: z.string().nonempty({ message: "Cannot be empty" }),
  cardPin: z.string().nonempty({ message: "Cannot be empty" }),
});

const formSchema = z.discriminatedUnion("paymentMethod", [
  formSchemaCard,
  formSchemaCash,
]);

type FormInput = z.infer<typeof formSchema>;

type Field = keyof FormInput;

const Checkout = () => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields, isSubmitSuccessful, isSubmitting },
  } = useForm<FormInput>({
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

  const method = watch("paymentMethod");

  const isFieldValid = (field: Field) =>
    Boolean(dirtyFields[field] && !errors[field]);

  return (
    <main className={styles.background}>
      <div className="container">
        <GoBackButton />
        <div className={styles.layout}>
          <div className={styles.checkout}>
            <h1 className={styles.heading}>checkout</h1>
            <form
              onSubmit={handleSubmit(async (data) => {
                const itemsAbr = cart?.items?.map((item) => {
                  return { itemId: item.product.id, quantity: item.quantity };
                });

                await fetch("/api/new-order", {
                  method: "POST",
                  headers: { "Content-Type": "apllication/json" },
                  body: JSON.stringify({ ...data, items: itemsAbr }),
                }).then((res) => res.json());
              })}
              id="checkoutForm"
            >
              <fieldset>
                <legend className="sr-only">billing details</legend>
                <p aria-hidden="true" className={styles.fieldsetTitle}>
                  billing details
                </p>

                <div className={styles.gridFieldset}>
                  <TextInput
                    field="name"
                    label="Name"
                    placeholder="Alexei Ward"
                    error={errors.name}
                    register={register}
                    valid={isFieldValid("name")}
                  />

                  <TextInput
                    field="email"
                    label="Email Adress"
                    placeholder="alexei@mail.com"
                    error={errors.email}
                    register={register}
                    valid={isFieldValid("email")}
                  />

                  <TextInput
                    field="phoneNumber"
                    label="Phone Number"
                    placeholder="+1 (202) 555-0136"
                    error={errors.phoneNumber}
                    register={register}
                    valid={isFieldValid("phoneNumber")}
                  />
                </div>
              </fieldset>
              <fieldset>
                <legend className="sr-only">shipping info</legend>
                <p aria-hidden="true" className={styles.fieldsetTitle}>
                  shipping info
                </p>

                <div className={styles.gridFieldset}>
                  <TextInput
                    className={styles.wide}
                    field="address"
                    label="Your Address"
                    placeholder="1137 Williams Avenue"
                    error={errors.address}
                    register={register}
                    valid={isFieldValid("address")}
                  />

                  <TextInput
                    field="zipCode"
                    label="Zip Code"
                    placeholder="10001"
                    error={errors.zipCode}
                    register={register}
                    valid={isFieldValid("zipCode")}
                  />

                  <TextInput
                    field="city"
                    label="City"
                    placeholder="New York"
                    error={errors.city}
                    register={register}
                    valid={isFieldValid("city")}
                  />
                  <TextInput
                    field="country"
                    label="Country"
                    placeholder="United States"
                    error={errors.country}
                    register={register}
                    valid={isFieldValid("country")}
                  />
                </div>
              </fieldset>
              <fieldset>
                <legend className="sr-only">payment details</legend>
                <p aria-hidden="true" className={styles.fieldsetTitle}>
                  payment details
                </p>
                <div className={styles.gridFieldset}>
                  <p className={styles.paymentTitle}>Payment Method</p>
                  <div className={styles.radios}>
                    <label className={styles.radio}>
                      <input
                        {...register("paymentMethod")}
                        type="radio"
                        value="card"
                      />
                      e-Money
                    </label>
                    <label className={styles.radio}>
                      <input
                        {...register("paymentMethod")}
                        type="radio"
                        value="cash"
                      />
                      Cash on Delivery
                    </label>
                  </div>

                  {method === "card" ? (
                    <>
                      <TextInput
                        field="cardNumber"
                        label="e-Money Number"
                        placeholder="238521993"
                        // @ts-ignore
                        error={errors.cardNumber}
                        register={register}
                        // @ts-ignore
                        valid={isFieldValid("cardNumber")}
                      />
                      <TextInput
                        field="cardPin"
                        label="e-Money PIN"
                        placeholder="6891"
                        // @ts-ignore
                        error={errors.cardPin}
                        register={register}
                        // @ts-ignore
                        valid={isFieldValid("cardPin")}
                      />
                    </>
                  ) : (
                    <div className={styles.cashMessage}>
                      <Image src={PayOnDelivery} alt=""></Image>
                      <p>
                        The ‘Cash on Delivery’ option enables you to pay in cash
                        when our delivery courier arrives at your residence.
                        Just make sure your address is correct so that your
                        order will not be cancelled.
                      </p>
                    </div>
                  )}
                </div>
              </fieldset>
            </form>
          </div>
          <CartSummary>
            {isSubmitting ? (
              <button className="button-accent" type="button">
                Placing order...
              </button>
            ) : (
              <button
                className="button-accent"
                type="submit"
                form="checkoutForm"
              >
                {method === "card" ? "continue & pay" : "continue"}
              </button>
            )}
          </CartSummary>
        </div>
      </div>
      {modalOpen && (
        <OrderConfirmationModal
          items={modalItems ?? []}
          grandTotal={grandTotal ?? "$ 0"}
        />
      )}
    </main>
  );
};

export default Checkout;
