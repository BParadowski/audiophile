import { FormField } from "../formSchema";
import styles from "./RadioInput.module.scss";

import { memo } from "react";
import { useFormContext } from "react-hook-form";

interface RadioInputProps {
  field: FormField;
  value: string;
  text: string;
}

const RadioInput = ({ field, value, text }: RadioInputProps) => {
  const { register } = useFormContext();

  return (
    <label className={styles.labelWrapper}>
      <input {...register(field)} type="radio" value={value} />
      {text}
    </label>
  );
};

export default memo(RadioInput);
