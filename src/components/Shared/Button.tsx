import styles from "./Button.module.scss";

import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ForwardedRef, forwardRef } from "react";

interface BaseProps {
  theme: "accent" | "neutralLight" | "neutralDark";
}

interface StyledButtonProps extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  as?: "button";
}

interface StyledLinkProps
  extends BaseProps,
    LinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className"> {
  as: "Link";
}

type LinkOrButtonProps = StyledButtonProps | StyledLinkProps;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, LinkOrButtonProps>(function Button(props, ref) {
  if (props.as === "Link") {
    const { as, theme, children, ...rest } = props;
    return (
      <Link className={styles[theme]} {...rest} ref={ref as ForwardedRef<HTMLAnchorElement>}>
        {children}
      </Link>
    );
  } else {
    const { as, theme, children, ...rest } = props;
    return (
      <button className={styles[theme]} {...rest} ref={ref as ForwardedRef<HTMLButtonElement>}>
        {children}
      </button>
    );
  }
});

export default Button;
