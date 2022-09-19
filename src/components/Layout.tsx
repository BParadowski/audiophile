import React from "react";
import styles from "./Layout.module.scss";

const Layout = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  return <div className={styles.layout}>{children}</div>;
};

export default Layout;
