import { FormField } from "../formSchema";
import styles from "./TextInput.module.scss";

import { memo } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps {
  field: FormField;
  labelText: string;
  placeholder?: string;
  className?: string;
}

const TextInput = ({ field, labelText, placeholder, className }: InputProps) => {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext();

  const error = errors[field];
  const valid = Boolean(dirtyFields[field] && !errors[field]);

  return (
    <div className={className}>
      <div className={styles.flex}>
        <label htmlFor={field} className={styles.label}>
          {labelText}
        </label>
        <p className={styles.error} role="alert">
          {error ? `${error?.message}` : ""}
        </p>
      </div>
      <input
        id={field}
        placeholder={placeholder}
        className={styles.input}
        aria-invalid={!valid}
        data-error={Boolean(error)}
        {...register(field)}
      />
    </div>
  );
};

export default memo(TextInput);
