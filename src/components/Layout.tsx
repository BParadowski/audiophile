import React from "react";
import styles from "./Layout.module.scss";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
