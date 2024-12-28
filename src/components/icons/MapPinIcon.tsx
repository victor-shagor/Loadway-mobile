import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const MapPinIcon = ({
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
      d='M15.4 8.4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm0 11.2a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4Zm0-19.6A15.418 15.418 0 0 0 0 15.4c0 5.495 2.54 11.319 7.35 16.844a44.483 44.483 0 0 0 7.254 6.702 1.4 1.4 0 0 0 1.606 0 44.485 44.485 0 0 0 7.24-6.702c4.804-5.525 7.35-11.349 7.35-16.844A15.417 15.417 0 0 0 15.4 0Zm0 36.05C12.507 33.775 2.8 25.419 2.8 15.4a12.6 12.6 0 0 1 25.2 0c0 10.015-9.707 18.375-12.6 20.65Z'
    />
  </Svg>
);
export default MapPinIcon;
