import * as React from "react";
import Svg, { Path, Rect, SvgProps } from "react-native-svg";

export const IconCalendar = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="feather feather-calendar"
    {...props}
  >
    <Rect width={18} height={18} x={3} y={4} rx={2} ry={2} />
    <Path d="M16 2v4M8 2v4M3 10h18" />
  </Svg>
);
