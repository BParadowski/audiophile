import { UseFormRegister, FieldError } from "react-hook-form";
import styles from "./TextInput.module.scss";

interface InputProps {
  field: string;
  label: string;
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  placeholder?: string;
  valid: boolean;
  className?: string;
}

const TextInput = ({
  field,
  label,
  error,
  register,
  placeholder,
  valid,
  className,
}: InputProps) => {
  return (
    <div className={className}>
      <div className={styles.flex}>
        <label htmlFor={field} className={styles.label}>
          {label}
        </label>
        <p className={styles.error}>{error?.message || ""}</p>
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
