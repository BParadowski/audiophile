import Image from "next/future/image";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import audiophileLogo from "../../public/assets/shared/desktop/logo.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { cartContext } from "./CartContextProvider";
import MobileNav from "./Header/MobileNav";
import Cart from "./Header/Cart";
import MainNav from "./Header/MainNav";

const Header = () => {
  const [navExpanded, setNavExpanded] = useState(false);
  const [cartExpanded, setCartExpanded] = useState(false);
  const cartId = useContext(cartContext);
  const router = useRouter();

  /* the router is used to make header background transparent 
    and position it "absolute" on home page. It allows a part of the 
    hero image to become the background. */

  const mobileNavRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const cartButtonRef = useRef<HTMLButtonElement>(null);

  const fetchCart = () => {
    return fetch("/api/get-cart", {
      method: "POST",
      headers: { "Content-Type": "apllication/json" },
      body: JSON.stringify({ cartId }),
    }).then((res) => res.json());
  };

  // this function needs to stay to display number of item in the cart
  const cartContentsQuery = useQuery(["cart-query"], fetchCart, {
    enabled: Boolean(cartId),
  });

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
      {navExpanded && (
        <MobileNav close={() => setNavExpanded(false)} ref={mobileNavRef} />
      )}
      {cartExpanded && (
        <Cart close={() => setCartExpanded(false)} ref={cartRef} />
      )}

      {/* Backdrop for both */}
      <div
        className={styles.backdrop}
        data-cart-open={cartExpanded}
        data-nav-open={navExpanded}
      ></div>

      {/* Actual header */}
      <div className="container">
        <div className={styles.wrapper}>
          <div
            className={styles.flexbox}
            data-absolute={router.pathname === "/"}
          >
            <button
              className={styles.hamburger}
              aria-expanded={navExpanded}
              onClick={() => setNavExpanded((state) => !state)}
              ref={hamburgerRef}
            ></button>

            <Link href="/">
              <a className={styles.logo}>
                <Image src={audiophileLogo} alt="Audiophile logo" />
              </a>
            </Link>

            <MainNav />

            <button
              aria-label="Shopping cart"
              className={styles["cart-button"]}
              aria-expanded={cartExpanded}
              onClick={() => setCartExpanded(!cartExpanded)}
              ref={cartButtonRef}
              data-product-count={cartContentsQuery.data?.length ?? "0"}
            ></button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
