import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const BillIcon = ({ width = 24, height = 24, color = "#C0C4CA" }: SvgProps) => (
  <Svg
    width='100%'
    height='100%'
    fill='none'
    viewBox={`0 0 ${width} ${height}`}
  >
    <Path
      fill={color}
      d='M47.042 19.6v23.522a3.92 3.92 0 0 1-3.92 3.92H3.92A3.92 3.92 0 0 1 0 43.122V19.6a3.92 3.92 0 0 1 3.92-3.92h39.202a3.92 3.92 0 0 1 3.92 3.92ZM5.88 11.76h35.282a1.96 1.96 0 1 0 0-3.92H5.88a1.96 1.96 0 0 0 0 3.92ZM9.8 3.92h27.442a1.96 1.96 0 0 0 0-3.92H9.8a1.96 1.96 0 1 0 0 3.92Z'
    />
  </Svg>
);
export default BillIcon;
