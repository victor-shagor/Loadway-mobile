import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const MailIcon = ({ width = 24, height = 24, color = "#C0C4CA" }: SvgProps) => (
  <Svg
    width='100%'
    height='100%'
    fill='none'
    viewBox={`0 0 ${width} ${height}`}
  >
    <Path
      fill={color}
      d='M35.6 0H2A1.4 1.4 0 0 0 .6 1.4v23.8A2.8 2.8 0 0 0 3.4 28h30.8a2.8 2.8 0 0 0 2.8-2.8V1.4A1.4 1.4 0 0 0 35.6 0ZM32 2.8 18.8 14.901 5.6 2.8H32Zm2.2 22.4H3.4V4.583l14.453 13.25a1.4 1.4 0 0 0 1.894 0L34.2 4.582V25.2Z'
    />
  </Svg>
);
export default MailIcon;
