import Image from "next/future/image";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import audiophileLogo from "../../public/assets/shared/desktop/logo.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import ProductCategories from "./Shared/ProductCategories";
import { useQuery } from "@tanstack/react-query";
import { cartContext } from "./CartContextProvider";

interface CartItem {
  quantity: number;
  product: {
    name: string;
    id: number;
    slug: string;
    price: number;
  };
}

const Header = () => {
  const [navExpanded, setNavExpanded] = useState(false);
  const [cartExpaned, setCartExpanded] = useState(false);
  const router = useRouter();

  /* the router is used to make header background transparent 
    and position it "absolute" on home page. It allows a part of the 
    hero image to become the background. */

  const mobileNavRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const cartId = useContext(cartContext);

  const fetchCart = () => {
    return fetch("/api/get-cart", {
      method: "POST",
      headers: { "Content-Type": "apllication/json" },
      body: JSON.stringify({ cartId }),
    });
  };
  const cartContentsQuery = useQuery(["cart-query"], fetchCart, {
    enabled: Boolean(cartId),
  });

  useEffect(() => {
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
        !cartButtonRef.current.contains(e.target as Node)
      ) {
        setCartExpanded(false);
      }
    };

    if (navExpanded) {
      window.addEventListener("mousedown", closeNav, true);
      return () => window.removeEventListener("mousedown", closeNav, true);
    } else if (cartExpaned) {
      window.addEventListener("mousedown", closeCart, true);
      return () => window.removeEventListener("mousedown", closeCart, true);
    }
  }, [navExpanded, cartExpaned]);

  return (
    <header className={styles.header} data-absolute={router.pathname === "/"}>
      {/* Mobile navigation menu */}
      <nav
        className={styles["mobile-nav"]}
        data-nav-open={navExpanded}
        ref={mobileNavRef}
      >
        <div className={styles.dropdown}>
          <ProductCategories onLinkClick={() => setNavExpanded(false)} />
        </div>
      </nav>
      {/* Cart */}
      <div></div>
      {/* Backdrop for both cart and mobile nav */}
      <div
        className={styles.backdrop}
        data-cart-open={cartExpaned}
        data-nav-open={navExpanded}
      ></div>
      <div className="container">
        <div className={styles.wrapper}>
          <div
            className={styles["flex-container"]}
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
            <nav className={styles.nav}>
              <ul role="list">
                <li>
                  <Link href="/">home</Link>
                </li>
                <li>
                  <Link href="/headphones">headphones</Link>
                </li>
                <li>
                  <Link href="/speakers">speakers</Link>
                </li>
                <li>
                  <Link href="/earphones">earphones</Link>
                </li>
              </ul>
            </nav>
            <button
              aria-label="Shopping cart"
              className={styles["cart-button"]}
              aria-expanded={cartExpaned}
              onClick={() => setCartExpanded(!cartExpaned)}
              ref={cartButtonRef}
            ></button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
