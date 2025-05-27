import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export const IconArchive = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="feather feather-archive"
    {...props}
  >
    <Path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" />
  </Svg>
);
