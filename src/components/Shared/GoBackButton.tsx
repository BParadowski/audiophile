import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./GoBackButton.module.scss";

const GoBackButton = () => {
  const router = useRouter();

  useEffect(() => {
    router.beforePopState((state) => {
      state.options.scroll = false;
      return true;
    });
  }, []);

  return (
    <button onClick={() => router.back()} className={styles.back}>
      Go Back
    </button>
  );
};

export default GoBackButton;
