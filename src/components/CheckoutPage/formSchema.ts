import * as z from "zod";

const formSchemaCash = z.object({
  name: z.string().min(1, { message: "Cannot be empty" }),
  email: z.string().min(1, { message: "Cannot be empty" }).email({ message: "Invalid format" }),
  phoneNumber: z.string().min(1, { message: "Cannot be empty" }),
  address: z.string().min(1, { message: "Cannot be empty" }),
  zipCode: z
    .string()
    .min(1, { message: "Cannot be empty" })
    .regex(/^\d+$/, { message: "Must contain digits only" })
    .length(5, { message: "Must be 5 digits long" }),
  city: z.string().min(1, { message: "Cannot be empty" }),
  country: z.string().min(1, { message: "Cannot be empty" }),
  paymentMethod: z.literal("cash"),
});

const formSchemaCard = z.object({
  name: z.string().min(1, { message: "Cannot be empty" }),
  email: z.string().min(1, { message: "Cannot be empty" }).email({ message: "Invalid format" }),
  phoneNumber: z.string().min(1, { message: "Cannot be empty" }),
  address: z.string().min(1, { message: "Cannot be empty" }),
  zipCode: z
    .string()
    .min(1, { message: "Cannot be empty" })
    .regex(/^\d+$/, { message: "Must contain digits only" })
    .length(5, { message: "Must be 5 digits long" }),
  city: z.string().min(1, { message: "Cannot be empty" }),
  country: z.string().min(1, { message: "Cannot be empty" }),
  paymentMethod: z.literal("card"),
  cardNumber: z.string().min(1, { message: "Cannot be empty" }),
  cardPin: z.string().min(1, { message: "Cannot be empty" }),
});

export const formSchema = z.discriminatedUnion("paymentMethod", [formSchemaCard, formSchemaCash]);

export type FormInput = z.infer<typeof formSchema>;

export type Field = keyof FormInput;
