import React from "react";
import { IconProvider, IconTypes } from "@src/constants/data";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons/";

export const renderIcon = (
  icon: IconTypes | string,
  provider: IconProvider,
  size: number,
  color: string
) => {
  switch (provider) {
    case "AntDesign":
      return (
        <AntDesign
          name={icon as keyof typeof AntDesign.glyphMap}
          size={size}
          color={color}
        />
      );

    case "Feather":
      return (
        <Feather
          name={icon as keyof typeof Feather.glyphMap}
          size={size}
          color={color}
        />
      );

    case "MaterialCommunityIcons":
      return (
        <MaterialCommunityIcons
          name={icon as keyof typeof MaterialCommunityIcons.glyphMap}
          size={size}
          color={color}
        />
      );
    case "Entypo":
      return (
        <Entypo
          name={icon as keyof typeof Entypo.glyphMap}
          size={size}
          color={color}
        />
      );
    case "FontAwesome":
      return (
        <FontAwesome
          name={icon as keyof typeof FontAwesome.glyphMap}
          size={size}
          color={color}
        />
      );

    default:
      return "";
  }
};
