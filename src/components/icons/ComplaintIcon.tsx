import { ExtendedSvgProps } from "@src/utils/Types";
import React from "react";
import Svg, { Path } from "react-native-svg";

const ComplaintIcon = ({
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
      d='M58.009 55.837H7.139c-3.67 0-5.973-3.842-4.19-6.953L28.383 4.718c1.833-3.2 6.55-3.2 8.382 0l25.434 44.166c1.783 3.111-.52 6.953-4.19 6.953Z'
    />
    <Path
      fill={secondaryColor}
      d='M64.215 47.72 38.783 3.554a7.201 7.201 0 0 0-12.417 0L.934 47.72a6.837 6.837 0 0 0 0 6.898 7.082 7.082 0 0 0 6.209 3.545h50.863a7.082 7.082 0 0 0 6.204-3.545 6.837 6.837 0 0 0 .005-6.898Zm-4.033 4.569a2.472 2.472 0 0 1-2.176 1.221H7.143a2.472 2.472 0 0 1-2.176-1.221 2.207 2.207 0 0 1 0-2.245L30.4 5.878a2.545 2.545 0 0 1 4.362 0l25.432 44.166a2.206 2.206 0 0 1-.011 2.245Zm-29.934-17.39V23.264a2.326 2.326 0 1 1 4.653 0v11.633a2.327 2.327 0 1 1-4.653 0Zm5.816 10.468a3.49 3.49 0 1 1-6.98 0 3.49 3.49 0 0 1 6.98 0Z'
    />
  </Svg>
);
export default ComplaintIcon;
