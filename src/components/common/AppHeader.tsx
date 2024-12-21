import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { getStatusBarHeight } from "@src/utils/dimension";

type Props = {
  leftIcon?: any;
  rightIcon?: any;
  title?: string;
  color?: string;
  handleLeftBtnPress?: () => void;
};

const AppHeader = ({
  leftIcon = "",
  rightIcon = "",
  title = "",
  color = "#000",
  handleLeftBtnPress,
}: Props) => {
  const statusBarHeight = getStatusBarHeight();

  return (
    <View
      className={`bg-[#f1f1f1] flex items-center flex-row px-[5vw]`}
      style={{ paddingTop: statusBarHeight }}
    >
      {leftIcon ? (
        <Pressable
          className='shrink-0'
          onPress={handleLeftBtnPress}
          children={({ pressed }) => (
            <Feather
              name={leftIcon}
              color={color}
              className={`${
                pressed ? "opacity-50" : ""
              } opacity-100 transition-opacity`}
              size={24}
            />
          )}
        />
      ) : (
        <View className='shrink-0 w-8 aspect-square'></View>
      )}
      <Text className='text-xl text-center font-medium flex-1'>{title}</Text>
      {rightIcon ? (
        <Pressable
          className='shrink-0'
          onPress={handleLeftBtnPress}
          children={({ pressed }) => (
            <Feather
              name={rightIcon}
              color={color}
              className={`${
                pressed ? "opacity-50" : ""
              } opacity-100 transition-opacity`}
              size={24}
            />
          )}
        />
      ) : (
        <View className='shrink-0 w-8 aspect-square'></View>
      )}
    </View>
  );
};

export default AppHeader;
