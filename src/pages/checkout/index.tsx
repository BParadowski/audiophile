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
  address: z.string(),
  zipCode: z.string(),
  city: z.string(),
  country: z.string(),
});

type FormInput = z.infer<typeof formSchema>;

type Field = keyof FormInput;

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
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
    },
  });

  const isFieldValid = (field: Field) =>
    Boolean(dirtyFields[field] && !errors[field]);

  return (
    <main className={styles.background}>
      <div className="container">
        <GoBackButton />
        <div className={styles.checkout}>
          <h1 className={styles.heading}>checkout</h1>
          <form
            onSubmit={handleSubmit((data) => console.log(data))}
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
