import { formConfig } from "./formConfig";
import { FormSchemaType } from "./formSchema";

import { PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";

const FormContextProvider = ({ children }: PropsWithChildren) => {
  const formMethodsAndProperties = useForm<FormSchemaType>(formConfig);

  return <FormProvider {...formMethodsAndProperties}>{children}</FormProvider>;
};

export default FormContextProvider;
