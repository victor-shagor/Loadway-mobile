import { ExtendedSvgProps } from "@src/utils/Types";
import React from "react";
import Svg, { Path } from "react-native-svg";

const ElectricityIcon = ({
  width = 80,
  height = 80,
  primaryColor = "#F71808",
  secondaryColor = "#161B23",
}: ExtendedSvgProps) => (
  <Svg
    width='100%'
    height='100%'
    fill='none'
    viewBox={`0 0 ${width} ${height}`}
  >
    <Path
      fill={primaryColor}
      d='m16.3 67.455 4.652-23.265L2.34 37.21 34.912 2.312l-4.654 23.266 18.613 6.98-32.572 34.897Z'
    />
    <Path
      fill={secondaryColor}
      d='M51.136 32.028a2.326 2.326 0 0 0-1.454-1.646l-16.754-6.285 4.264-21.326A2.327 2.327 0 0 0 33.21.736L.64 35.634a2.326 2.326 0 0 0 .872 3.78l16.76 6.285L14.02 67a2.326 2.326 0 0 0 3.982 2.036l32.571-34.898a2.328 2.328 0 0 0 .564-2.111ZM20.188 59.895l3.045-15.233a2.327 2.327 0 0 0-1.455-2.634L6.412 36.256 31.02 9.891l-3.04 15.233a2.326 2.326 0 0 0 1.454 2.634l15.355 5.759-24.6 26.38Z'
    />
  </Svg>
);
export default ElectricityIcon;
