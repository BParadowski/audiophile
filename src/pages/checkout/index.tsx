import GoBackButton from "../../components/Shared/GoBackButton";
import styles from "../../styles/pages/Checkout.module.scss";
import CartSummary from "../../components/Checkout/CartSummary";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TextInput from "../../components/Checkout/TextInput";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "Invalid format" }),
  phoneNumber: z.string(),
});

type FormInput = z.infer<typeof formSchema>;

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },
  });

  return (
    <main className={styles.background}>
      <div className="container">
        <GoBackButton />
        <div className={styles.checkout}>
          <h1>checkout</h1>
          <form
            onSubmit={handleSubmit((data) => console.log(data))}
            id="checkoutForm"
          >
            <fieldset>
              <legend className="sr-only">billing details</legend>
              <p aria-hidden="true" className={styles.fieldsetTitle}>
                billing details
              </p>

              <TextInput
                field="name"
                label="Name"
                placeholder="Alexei Ward"
                error={errors.name}
                register={register}
              />

              <TextInput
                field="email"
                label="Email Adress"
                placeholder="alexei@mail.com"
                error={errors.email}
                register={register}
              />

              <TextInput
                field="phoneNumber"
                label="Phone Number"
                placeholder="+1 (202) 555-0136"
                error={errors.phoneNumber}
                register={register}
              />
            </fieldset>
          </form>
        </div>
        <CartSummary>
          <button className="button-accent" type="submit" form="checkoutForm">
            place order
          </button>
        </CartSummary>
      </div>
    </main>
  );
};

export default Checkout;
