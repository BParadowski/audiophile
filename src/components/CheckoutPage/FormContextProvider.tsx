import { PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormSchemaType } from "./formSchema";
import { formConfig } from "./formConfig";

const FormContextProvider = ({ children }: PropsWithChildren) => {
  const formMethodsAndProperties = useForm<FormSchemaType>(formConfig);

  return <FormProvider {...formMethodsAndProperties}>{children}</FormProvider>;
};

export default FormContextProvider;
