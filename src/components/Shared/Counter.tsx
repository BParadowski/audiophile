import styles from "./Counter.module.scss";

interface CounterProps {
  number: number;
  setNumber: (newNumber: number) => void;
  className?: string;
}
const Counter = ({ number, setNumber, className }: CounterProps) => {
  return (
    <div className={`${styles.counter} ${className ?? ""}`}>
      <button
        aria-label="minus"
        className={styles.minus}
        onClick={() => {
          if (number > 1) {
            setNumber(number - 1);
          }
        }}
      >
        -
      </button>
      <output className={styles.number}>{number}</output>
      <button
        aria-label="plus"
        onClick={() => {
          if (number < 10) {
            setNumber(number + 1);
          }
        }}
        className={styles.plus}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
