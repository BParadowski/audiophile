import styles from "./TextInput.module.scss";
import { Field } from "./formSchema";

import { useFormContext } from "react-hook-form";

interface InputProps {
  field: Field;
  label: string;
  placeholder?: string;
  className?: string;
}

const TextInput = ({ field, label, placeholder, className }: InputProps) => {
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
          {label}
        </label>
        <p className={styles.error}>{error ? `${error?.message}` : ""}</p>
      </div>
      <input
        id={field}
        placeholder={placeholder}
        className={styles.input}
        data-valid={valid}
        data-error={Boolean(error)}
        {...register(field)}
      />
    </div>
  );
};

export default TextInput;
