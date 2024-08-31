import React, { ReactNode } from "react";
import { ScrollView, ScrollViewProps } from "react-native";

interface IScrollViewProps extends ScrollViewProps {
  children: ReactNode;
}

const CustomScrollView = ({ children, ...rest }: IScrollViewProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} {...rest}>
      {children}
    </ScrollView>
  );
};

export default CustomScrollView;
