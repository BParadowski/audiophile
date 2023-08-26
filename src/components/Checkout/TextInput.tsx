import { UseFormRegister, FieldError } from "react-hook-form";
import styles from "./TextInput.module.scss";

interface InputProps {
  field: string;
  label: string;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  placeholder?: string;
}

const TextInput = ({
  field,
  label,
  error,
  register,
  placeholder,
}: InputProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={field} className={styles.label}>
        {label}
      </label>
      <p className={styles.error}>{error?.message || ""}</p>
      <input
        id={field}
        placeholder={placeholder}
        className={styles.input}
        {...register(field)}
      />
    </div>
  );
};

export default TextInput;
