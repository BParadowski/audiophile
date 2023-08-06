import styles from "./Counter.module.scss";

interface CounterProps {
  number: number;
  onMinusClick: Function;
  onPlusClick: Function;
  className?: string;
}

const Counter = ({
  number,
  onMinusClick,
  onPlusClick,
  className,
}: CounterProps) => {
  return (
    <div className={`${styles.counter} ${className ?? ""}`}>
      <button
        aria-label="minus"
        className={styles.minus}
        onClick={() => onMinusClick()}
      >
        -
      </button>
      <output className={styles.number}>{number}</output>
      <button
        aria-label="plus"
        onClick={() => onPlusClick()}
        className={styles.plus}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
