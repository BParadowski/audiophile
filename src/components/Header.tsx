import Image from "next/future/image";
import { useState } from "react";
import styles from "./Header.module.scss";
import audiophileLogo from "../../public/assets/shared/desktop/logo.svg";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const [navExpaned, setMobileExpanded] = useState(false);
  const [cartExpaned, setCartExpanded] = useState(false);
  const router = useRouter();
  /* the router is used to make header background transparent 
    and position it "absolute" so that part of the hero image
    at home page is the background.*/

  return (
    <header className={styles.header} data-absolute={router.pathname === "/"}>
      <div className="container">
        <div className={styles.wrapper}>
          <div
            className={styles["flex-container"]}
            data-absolute={router.pathname === "/"}
          >
            <button
              className={styles.hamburger}
              aria-expanded={navExpaned}
              onClick={() => setMobileExpanded(!navExpaned)}
            ></button>
            <Image
              src={audiophileLogo}
              alt="Audiophile logo"
              className={styles.logo}
            />
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
