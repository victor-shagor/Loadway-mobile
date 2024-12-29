import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const HomeIcon = ({ width = 24, height = 24, color = "#C0C4CA" }: SvgProps) => (
  <Svg
    width='100%'
    height='100%'
    fill='none'
    viewBox={`0 0 ${width} ${height}`}
  >
    <Path
      fill={color}
      d='M47.042 23.522v23.52a1.96 1.96 0 0 1-1.96 1.96H1.96A1.96 1.96 0 0 1 0 47.043v-23.52a3.889 3.889 0 0 1 1.15-2.774l19.6-19.6a3.92 3.92 0 0 1 5.542 0l19.6 19.6a3.888 3.888 0 0 1 1.15 2.774Z'
    />
  </Svg>
);
export default HomeIcon;
