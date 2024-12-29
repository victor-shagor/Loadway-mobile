import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const ProfileIcon = ({ width = 24, height = 24, color = "#C0C4CA" }: SvgProps) => (
  <Svg
    width='100%'
    height='100%'
    fill='none'
    viewBox={`0 0 ${width} ${height}`}
  >
    <Path
      fill={color}
      d='M50.698 48.029a1.959 1.959 0 0 1-1.698.98H1.958a1.96 1.96 0 0 1-1.695-2.94c3.731-6.452 9.481-11.077 16.192-13.27a17.64 17.64 0 1 1 18.048 0c6.71 2.193 12.46 6.818 16.192 13.27a1.96 1.96 0 0 1 .003 1.96Z'
    />
  </Svg>
);
export default ProfileIcon;
