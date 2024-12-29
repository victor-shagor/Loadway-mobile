import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const PhoneIcon = ({
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
      d='m33.315 23.53-8.244-3.694-.023-.01a2.8 2.8 0 0 0-2.655.244c-.046.03-.09.063-.131.098l-4.26 3.632c-2.698-1.311-5.484-4.076-6.795-6.74l3.636-4.324c.036-.044.069-.087.1-.135a2.8 2.8 0 0 0 .231-2.635v-.021L11.47 1.687A2.8 2.8 0 0 0 8.56.02 9.845 9.845 0 0 0 0 9.8C0 23.695 11.305 35 25.2 35a9.845 9.845 0 0 0 9.779-8.561 2.8 2.8 0 0 0-1.664-2.909ZM25.2 32.2A22.424 22.424 0 0 1 2.8 9.8a7.035 7.035 0 0 1 6.102-7v.02l3.675 8.226-3.617 4.33a.953.953 0 0 0-.1.134 2.8 2.8 0 0 0-.175 2.747c1.586 3.243 4.853 6.486 8.13 8.07a2.8 2.8 0 0 0 2.757-.2c.045-.03.088-.063.13-.098l4.254-3.63 8.225 3.684h.019a7.037 7.037 0 0 1-7 6.117Z'
    />
  </Svg>
);
export default PhoneIcon;
