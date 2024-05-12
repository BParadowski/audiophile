import styles from "./Layout.module.scss";

import React from "react";

const Layout = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  return <div className={styles.layout}>{children}</div>;
};

export default Layout;
