import React from "react";

interface PictureProps {
  mobileUrl?: string;
  tabletUrl?: string;
  desktopUrl: string;
  alt?: string;
  className?: string;
}

const breakpoints = {
  mobile: "(max-width: 32.5em)",
  tablet: "(max-width: 50em)",
};

const Picture: React.FC<PictureProps> = (props) => {
  return (
    <picture>
      {props.mobileUrl && (
        <source srcSet={props.mobileUrl} media={breakpoints.mobile} />
      )}
      {props.tabletUrl && (
        <source srcSet={props.tabletUrl} media={breakpoints.tablet} />
      )}
      <img
        alt={props.alt ?? ""}
        src={props.desktopUrl}
        className={props.className ?? undefined}
      />
    </picture>
  );
};

export default Picture;
