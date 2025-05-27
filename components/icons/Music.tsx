import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

export const IconMusic = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="feather feather-music"
    {...props}
  >
    <Path d="M9 18V5l12-2v13" />
    <Circle cx={6} cy={18} r={3} />
    <Circle cx={18} cy={16} r={3} />
  </Svg>
);
