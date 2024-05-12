import styles from "./MobileNav.module.scss";

import { ForwardedRef, forwardRef } from "react";

import ProductCategories from "@/components/Shared/ProductCategories";

interface navProps {
  close: () => void;
}

const MobileNav = forwardRef(function MobileNav({ close }: navProps, ref: ForwardedRef<HTMLElement>) {
  return (
    <nav className={styles.nav} ref={ref} aria-label="Main navigation">
      <div className={styles.dropdown}>
        <ProductCategories onLinkClick={close} />
      </div>
    </nav>
  );
});

export default MobileNav;
