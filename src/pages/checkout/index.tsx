import GoBackButton from "../../components/Shared/GoBackButton";
import styles from "../../styles/pages/Checkout.module.scss";
import CartSummary from "../../components/Checkout/CartSummary";

const Checkout = () => {
  return (
    <main className={styles.background}>
      <div className="container">
        <GoBackButton />
        <div className={styles.checkout}>
          Welcome to the checkout route it is currently in construction!
        </div>
        <CartSummary />
      </div>
    </main>
  );
};

export default Checkout;
