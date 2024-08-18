import { Text, type TextProps, StyleSheet } from "react-native";

export type ThemedTextProps = TextProps & {
  type?: "default" | "title" | "small";
};

export function ThemedText({
  style,
  type = "default",
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={
        [
        { fontFamily: "Epilogue" },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "small" ? styles.small : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    fontWeight: "400",
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
  },
  small: {
    fontSize: 12,
    fontWeight: "500",

  },
});
