import Image from "next/future/image";
import { ReactElement, useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import audiophileLogo from "../../public/assets/shared/desktop/logo.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import ProductCategories from "./Shared/ProductCategories";

const Header = () => {
  const [navExpanded, setNavExpanded] = useState(false);
  const [cartExpaned, setCartExpanded] = useState(false);
  const router = useRouter();
  const mobileNav = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const closeNav = (e: MouseEvent) => {
      if (
        mobileNav.current &&
        !mobileNav.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setNavExpanded(false);
      }
    };
    if (navExpanded) {
      window.addEventListener("mousedown", closeNav, true);
      return () => window.removeEventListener("mousedown", closeNav, true);
    }
  }, [mobileNav, navExpanded]);
  /* the router is used to make header background transparent 
    and position it "absolute" so that part of the hero image
    at home page is the background.*/

  return (
    <header className={styles.header} data-absolute={router.pathname === "/"}>
      <nav
        className={styles["mobile-nav"]}
        data-open={navExpanded}
        ref={mobileNav}
      >
        <div className={styles.dropdown}>
          <ProductCategories onLinkClick={() => setNavExpanded(false)} />
        </div>
        <div className={styles.backdrop}></div>
      </nav>
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
              className={styles.cart}
              aria-expanded={cartExpaned}
              onClick={() => setCartExpanded(!cartExpaned)}
            ></button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
