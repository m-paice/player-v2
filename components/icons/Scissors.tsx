import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

export const IconScissors = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="feather feather-scissors"
    {...props}
  >
    <Circle cx={6} cy={6} r={3} />
    <Circle cx={6} cy={18} r={3} />
    <Path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" />
  </Svg>
);
