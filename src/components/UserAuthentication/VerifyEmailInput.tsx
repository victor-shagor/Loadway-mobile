import { View, TextInput, Text } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useOnboarding } from "@src/context/onboarding";



const VerifyEmailInput = () => {
  const context = useOnboarding()!;
  const { setColor } = context;

  const array = [1, 2, 3, 4, 5];
  const [inputValues, setInputValues] = useState<number[]>([]);
  const inputRefs = useRef<TextInput[]>([]);

  const changeFocus = (value: any, id: number) => {
    const newValue: number = Number(value);
    const newId = id - 1;
    const newValues = inputValues.length > 0 ? [...inputValues] : [];
    newValues[newId] = newValue;
    setInputValues(newValues);

    if (id < array.length && value) {
      inputRefs.current[id].focus();
    }
    if (id === 5) {
      setColor('#F6411B');
    }
  };

  const handleKeyPress = (event: any, id: number) => {
    if (event.nativeEvent.key === "Backspace") {
      const newInputValue = event.nativeEvent.text;
      console.log(newInputValue, "text");

      if (id > 1) {
        const newValues = inputValues!;
        newValues.pop();
        setInputValues(newValues);
        if (newInputValue) {
          inputRefs.current[id - 1].focus();
        } else {
          inputRefs.current[id - 2].focus();
        }
      }
    }
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <View className=" mx-5 my-8">
      <View className=" flex-row gap-5">
        {array.map((id, index) => {
          return (
            <TextInput
              placeholder="_"
              placeholderTextColor={"black"}
              maxLength={1}
              inputMode="numeric"
              enterKeyHint="done"
              key={id}
              onChangeText={(value) => changeFocus(value, id)}
              onKeyPress={(event) => handleKeyPress(event, id)}
              ref={(el) => (inputRefs.current[index] = el!)}
              className=" w-[14vw] bg-[#D4D4D41A] border-2 border-[#52514E33]
              h-[7.5vh] text-center rounded-lg
              "
            />
          );
        })}
      </View>
    </View>
  );
};

export default VerifyEmailInput;
