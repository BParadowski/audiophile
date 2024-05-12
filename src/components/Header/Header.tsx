import styles from "./Header.module.scss";

import audiophileLogo from "@/public/assets/shared/desktop/logo.svg";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";

import { cartContext } from "@/components/CartContextProvider";
import Cart from "@/components/Header/Cart";
import MainNav from "@/components/Header/MainNav";
import MobileNav from "@/components/Header/MobileNav";

const Header = () => {
  const [navExpanded, setNavExpanded] = useState(false);
  const [cartExpanded, setCartExpanded] = useState(false);

  /* the router is used to make header background transparent 
    and position it "absolute" on home page. It allows for a part of the 
    hero image to become the background. */
  const router = useRouter();

  /* querying the database for the number of items in the cart to show on the button*/
  const cart = useContext(cartContext);

  /* making the dropdowns close upon clicking outside of their bounds*/
  const mobileNavRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const cartButtonRef = useRef<HTMLButtonElement>(null);

  const closeNav = (e: MouseEvent) => {
    if (
      mobileNavRef.current &&
      !mobileNavRef.current.contains(e.target as Node) &&
      hamburgerRef.current &&
      !hamburgerRef.current.contains(e.target as Node)
    ) {
      setNavExpanded(false);
    }
  };

  const closeCart = (e: MouseEvent) => {
    if (
      cartButtonRef.current &&
      !cartButtonRef.current.contains(e.target as Node) &&
      cartRef.current &&
      !cartRef.current.contains(e.target as Node)
    ) {
      setCartExpanded(false);
    }
  };

  useEffect(() => {
    if (navExpanded) {
      window.addEventListener("mousedown", closeNav, true);
      return () => window.removeEventListener("mousedown", closeNav, true);
    } else if (cartExpanded) {
      window.addEventListener("mousedown", closeCart, true);
      return () => window.removeEventListener("mousedown", closeCart, true);
    }
  }, [navExpanded, cartExpanded]);

  return (
    <header className={styles.header} data-absolute={router.pathname === "/"}>
      {/* Mobile nav and cart dropdowns */}
      {navExpanded && <MobileNav close={() => setNavExpanded(false)} ref={mobileNavRef} />}
      {cartExpanded && <Cart close={() => setCartExpanded(false)} ref={cartRef} />}

      {/* Backdrop for both */}
      <div className={styles.backdrop} data-cart-open={cartExpanded} data-nav-open={navExpanded}></div>

      {/* Actual header */}
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.flexbox} data-absolute={router.pathname === "/"}>
            <button
              aria-label="Main menu"
              className={styles.hamburger}
              aria-expanded={navExpanded}
              onClick={() => setNavExpanded(!navExpanded)}
              ref={hamburgerRef}
            ></button>

            <Link href="/" className={styles.logo}>
              <Image src={audiophileLogo} alt="Audiophile logo" />
            </Link>

            <MainNav />

            <button
              aria-label="Shopping cart"
              className={styles.cartButton}
              aria-expanded={cartExpanded}
              onClick={() => setCartExpanded(!cartExpanded)}
              ref={cartButtonRef}
              data-product-count={cart?.numberOfItems ?? "0"}
            ></button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
