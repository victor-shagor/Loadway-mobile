import { ExtendedSvgProps } from "@src/utils/Types";
import React from "react";
import Svg, { Path } from "react-native-svg";

const GuestIcon = ({
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
      d='M53.51 25.592v32.572a2.326 2.326 0 0 1-2.326 2.326H4.653a2.326 2.326 0 0 1-2.327-2.327v-32.57a2.327 2.327 0 0 1 2.327-2.327h46.53a2.327 2.327 0 0 1 2.327 2.326Z'
    />
    <Path
      fill={secondaryColor}
      d='M51.184 20.939h-9.306v-6.98a13.96 13.96 0 0 0-27.919 0v6.98H4.653A4.653 4.653 0 0 0 0 25.592v32.571a4.653 4.653 0 0 0 4.653 4.653h46.53a4.653 4.653 0 0 0 4.654-4.653V25.592a4.653 4.653 0 0 0-4.653-4.653Zm-32.572-6.98a9.306 9.306 0 0 1 18.612 0v6.98H18.612v-6.98Zm32.572 44.204H4.654V25.592h46.53v32.571ZM31.408 41.878a3.49 3.49 0 1 1-6.979 0 3.49 3.49 0 0 1 6.98 0Z'
    />
  </Svg>
);
export default GuestIcon;
