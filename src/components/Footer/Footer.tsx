import styles from "./Footer.module.scss";

import iconFacebook from "@/public/assets/shared/desktop/icon-facebook.svg";
import iconInstagram from "@/public/assets/shared/desktop/icon-instagram.svg";
import iconTwitter from "@/public/assets/shared/desktop/icon-twitter.svg";
import audiophileLogo from "@/public/assets/shared/desktop/logo.svg";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles["decorating-line"]}></div>
          <Image src={audiophileLogo} alt="" className={styles.logo} />
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
          <p className={styles.description}>
            Audiophile is an all in one stop to fulfill your audio needs. We’re a small team of music lovers and sound
            specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo
            facility - we’re open 7 days a week.
          </p>
          <p className={styles.copyright}>Copyright 2024. All Rights Reserved</p>

          <ul className={styles.socials} role="list" aria-label="Social media links">
            <li>
              <a href="" aria-label="Facebook">
                <Image src={iconFacebook} className={styles.icon} alt="" />
              </a>
            </li>
            <li>
              <a href="" aria-label="Twitter">
                <Image src={iconTwitter} className={styles.icon} alt="" />
              </a>
            </li>
            <li>
              <a href="" aria-label="Instagram">
                <Image src={iconInstagram} className={styles.icon} alt="" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
