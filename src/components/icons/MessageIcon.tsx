import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const MessageIcon = ({
  width = 24,
  height = 24,
  color = "#C0C4CA",
}: SvgProps) => (
  <Svg
    width='100%'
    height='100%'
    fill='none'
    viewBox={`0 0 ${width} ${height}`}
  >
    <Path
      fill={color}
      d='M50.962 3.92v31.361a3.92 3.92 0 0 1-3.92 3.92H14.456l-7.988 6.9-.022.017a3.894 3.894 0 0 1-2.526.924 3.932 3.932 0 0 1-1.663-.373A3.88 3.88 0 0 1 0 43.122V3.92A3.92 3.92 0 0 1 3.92 0h43.122a3.92 3.92 0 0 1 3.92 3.92Z'
    />
  </Svg>
);
export default MessageIcon;
