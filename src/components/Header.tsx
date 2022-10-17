import Image from "next/future/image";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import audiophileLogo from "../../public/assets/shared/desktop/logo.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import ProductCategories from "./Shared/ProductCategories";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cartContext } from "./CartContextProvider";
import ProductSnippet from "../components/Shared/ProductSnippet";

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
  const [cartExpanded, setCartExpanded] = useState(false);
  const router = useRouter();

  /* the router is used to make header background transparent 
    and position it "absolute" on home page. It allows a part of the 
    hero image to become the background. */

  const mobileNavRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const cartId = useContext(cartContext);
  const queryClient = useQueryClient();

  const fetchCart = () => {
    return fetch("/api/get-cart", {
      method: "POST",
      headers: { "Content-Type": "apllication/json" },
      body: JSON.stringify({ cartId }),
    }).then((res) => res.json());
  };

  const clearCart = () => {
    return fetch("/api/clear-cart", {
      method: "POST",
      headers: { "Content-Type": "apllication/json" },
      body: JSON.stringify({ cartId }),
    });
  };

  const cartContentsQuery = useQuery(["cart-query"], fetchCart, {
    enabled: Boolean(cartId),
  });

  const clearingMutation = useMutation(["cart-query"], clearCart, {
    onSuccess: async () => {
      await queryClient.setQueryData(["cart-query"], []);
    },
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
        !cartButtonRef.current.contains(e.target as Node) &&
        cartRef.current &&
        !cartRef.current.contains(e.target as Node)
      ) {
        setCartExpanded(false);
      }
    };

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
      <div className={styles["cart-container"]}>
        <div
          ref={cartRef}
          className={styles["cart-dropdown"]}
          data-cart-open={cartExpanded}
        >
          {cartContentsQuery.data?.length > 0 ? (
            <div className={styles["cart-grid"]}>
              <p className={styles["cart-title"]}>
                Cart ({cartContentsQuery.data?.length})
              </p>
              <button
                className={styles["cart-remove"]}
                onClick={() => clearingMutation.mutate()}
              >
                Remove all
              </button>
              <div className={styles["cart-item-list"]}>
                {cartContentsQuery.data.map(
                  (cartItem: CartItem, index: number) => {
                    if (index < 8) {
                      return (
                        <ProductSnippet
                          key={cartItem.product.id}
                          id={cartItem.product.id}
                          name={cartItem.product.name}
                          price={cartItem.product.price}
                          quantity={cartItem.quantity}
                          slug={cartItem.product.slug}
                        />
                      );
                    } else return null;
                  }
                )}
              </div>
              <p className={styles["cart-total"]}>total</p>
              <p className={styles["cart-price"]}>
                ${" "}
                {cartContentsQuery.data.reduce(
                  (total: number, current: CartItem) => {
                    return total + current.product.price * current.quantity;
                  },
                  0
                )}
              </p>
              <Link href="/">
                <a className={`${styles["cart-checkout"]} button-accent`}>
                  checkout
                </a>
              </Link>
            </div>
          ) : (
            <div className={styles["cart-empty-layout"]}>
              <p>Your cart is empty.</p>
              <button
                onClick={() => setCartExpanded(false)}
                className="button-accent"
              >
                Continue shopping
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop for both cart and mobile nav */}
      <div
        className={styles.backdrop}
        data-cart-open={cartExpanded}
        data-nav-open={navExpanded}
      ></div>

      {/* Actual header */}
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
