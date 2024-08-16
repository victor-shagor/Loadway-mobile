import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SafeAreaViewProps = {
  disableBottomSafeArea?: boolean;
  disableTopSafeArea?: boolean;
  disableSidesSafeArea?: boolean;
  children: React.ReactNode;
};

export const SafeAreaView: React.FC<SafeAreaViewProps & ViewProps> = (
  props
) => {
  const {
    disableBottomSafeArea = false,
    disableTopSafeArea = false,
    disableSidesSafeArea = false,
    children,
  } = props;

  const insets = useSafeAreaInsets();

  const style = StyleSheet.create({
    parentView: {
      flex: 1,
    },
    safeAreaView: {
      flex: 1,
      marginBottom: !disableBottomSafeArea ? insets.bottom : undefined,
      marginTop: !disableTopSafeArea ? insets.top : undefined,
      marginLeft: !disableSidesSafeArea ? insets.left : undefined,
      marginRight: !disableSidesSafeArea ? insets.right : undefined,
    },
  });

  return (
    <View style={[style.parentView, props.style]} {...props}>
      <View style={style.safeAreaView}>{children}</View>
    </View>
  );
};
