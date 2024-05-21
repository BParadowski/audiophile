import styles from "./Button.module.scss";

import Link, { LinkProps } from "next/link";
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, ForwardedRef, forwardRef } from "react";

interface BaseProps {
  theme: "accent" | "neutralLight" | "neutralDark";
}

interface StyledButtonProps extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button";
}

interface StyledLinkProps extends BaseProps, LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  children?: React.ReactNode;
  as: "Link";
}

type LinkOrButtonProps = StyledButtonProps | StyledLinkProps;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, LinkOrButtonProps>(function Button(props, ref) {
  if (props.as === "Link") {
    const { as, className, theme, children, ...rest } = props;
    return (
      <Link className={`${styles[theme]} ${className}`} {...rest} ref={ref as ForwardedRef<HTMLAnchorElement>}>
        {children}
      </Link>
    );
  } else {
    const { as, className, theme, children, ...rest } = props;
    return (
      <button className={`${styles[theme]} ${className}`} {...rest} ref={ref as ForwardedRef<HTMLButtonElement>}>
        {children}
      </button>
    );
  }
});

export default Button;
