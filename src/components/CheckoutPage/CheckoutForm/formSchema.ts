import * as z from "zod";

const formSchemaCommon = z.object({
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
});

const formSchemaCash = formSchemaCommon.extend({
  paymentMethod: z.literal("cash"),
});

const formSchemaCard = formSchemaCommon.extend({
  paymentMethod: z.literal("card"),
  cardNumber: z.string().min(1, { message: "Cannot be empty" }),
  cardPin: z.string().min(1, { message: "Cannot be empty" }),
});

export const formSchema = z.discriminatedUnion("paymentMethod", [formSchemaCash, formSchemaCard]);

export type FormSchemaType = z.infer<typeof formSchema>;

export type FormField = keyof z.infer<typeof formSchemaCash> | keyof z.infer<typeof formSchemaCard>;
