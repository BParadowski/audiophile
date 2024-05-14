import { FormSchemaType, formSchema } from "./formSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormProps } from "react-hook-form";

export const formConfig: UseFormProps<FormSchemaType> = {
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
};

// Used to place the submit button outside the form body.

export const formHTMLId = "checkout-form-unique-identifier";
