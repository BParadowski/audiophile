import { FormSchemaType, formSchema } from "./formSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormProps } from "react-hook-form";

export const formConfig: UseFormProps<FormSchemaType> = {
  resolver: zodResolver(formSchema),
  mode: "onTouched",
  defaultValues: {
    name: "",
    email: "alexei@mail.com",
    phoneNumber: "+1 (202) 555-0136",
    address: "1137 Williams Avenue",
    zipCode: "1045",
    city: "New York",
    country: "United States",
    paymentMethod: "card",
    cardNumber: "238521993",
    cardPin: "6891",
  },
};

// Used to place the submit button outside the form body.

export const formHTMLId = "checkout-form-unique-identifier";
