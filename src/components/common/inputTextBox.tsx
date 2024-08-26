import { StyleSheet, Text, TextInput, View } from "react-native";

const InputTextBox = ({
  label,
  inputBoxStyle = {},
  inputStyle = {},
  value,
  onChange,
}: any) => {
  return (
    <>
      <Text>{label}</Text>
      <View style={[style.textBox, inputBoxStyle]}>
        <TextInput
          style={[style.input, inputStyle]}
          value={value}
          onChange={onChange}
        />
      </View>
    </>
  );
};

const style = StyleSheet.create({
  textBox: {
    width: "80%",
    height: 45,
    backgroundColor: "#D9CCD1",
    borderRadius: 6
  },
  input: {
    width: "100%",
    height: "100%",
    borderColor: "white",
  },
});


export default InputTextBox