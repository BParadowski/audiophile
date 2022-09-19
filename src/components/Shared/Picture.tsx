import React from "react";
import styles from "./Picture.module.scss";

interface PictureProps {
  mobileUrl?: string;
  tabletUrl?: string;
  desktopUrl: string;
  alt?: string;
  className?: string;
}

const breakpoints = {
  mobile: "(max-width: 32.5em)",
  tablet: "(max-width: 55em)",
};

const Picture: React.FC<PictureProps> = (props) => {
  return (
    <picture className={props.className ?? undefined}>
      {props.mobileUrl && (
        <source srcSet={props.mobileUrl} media={breakpoints.mobile} />
      )}
      {props.tabletUrl && (
        <source srcSet={props.tabletUrl} media={breakpoints.tablet} />
      )}
      <img
        alt={props.alt ?? ""}
        src={props.desktopUrl}
        className={styles.image}
      />
    </picture>
  );
};

export default Picture;
