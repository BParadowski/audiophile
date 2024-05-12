import styles from "./RadioInput.module.scss";
import { Field } from "./formSchema";

import { useFormContext } from "react-hook-form";

interface RadioInputProps {
  field: Field;
  value: string;
  text: string;
}

const RadioInput = ({ field, value, text }: RadioInputProps) => {
  const { register } = useFormContext();

  return (
    <label className={styles.radio}>
      <input {...register(field)} type="radio" value={value} />
      {text}
    </label>
  );
};

export default RadioInput;
