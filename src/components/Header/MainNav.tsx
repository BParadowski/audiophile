import styles from "./MainNav.module.scss";
import Link from "next/link";

const MainNav = () => {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
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
  );
};

export default MainNav;
