import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const CopyIcon = ({ width = 24, height = 24, color = "#C0C4CA" }: SvgProps) => (
  <Svg
    width='100%'
    height='100%'
    fill='none'
    viewBox={`0 0 ${width} ${height}`}
  >
    <Path
      fill={color}
      d='M19 4.5H1a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-18a1 1 0 0 0-1-1Zm-1 18H2v-16h16v16Zm6-21v18a1 1 0 0 1-2 0v-17H5a1 1 0 0 1 0-2h18a1 1 0 0 1 1 1Z'
    />
  </Svg>
);
export default CopyIcon;
