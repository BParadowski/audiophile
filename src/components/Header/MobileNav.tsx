import { ForwardRefExoticComponent, ForwardedRef, forwardRef } from "react";
import styles from "./MobileNav.module.scss";
import ProductCategories from "../Shared/ProductCategories";

interface navProps {
  close: () => void;
}

const MobileNav = forwardRef(function MobileNav(
  { close }: navProps,
  ref: ForwardedRef<HTMLElement>
) {
  return (
    <nav className={styles.nav} ref={ref}>
      <div className={styles.dropdown}>
        <ProductCategories onLinkClick={close} />
      </div>
    </nav>
  );
});

export default MobileNav;
