import { View, Text } from "react-native";
import React from "react";

const NavigationCircle = ({id}:{id: number}) => {
  return (
      <View 
       className=" flex-row w-screen h-[1.67vh] gap-[8px] ml-[5vw]
        items-center relative top-[2vh]">
        {[1, 2, 3].map((value) => {
          return (
            <View
              className={`w-[11px] h-full rounded-full border-2 border-[#F6411B] 
                ${id === value ? 'bg-[#F6411B]' : null}
                `}
              key={value}
            ></View>
          );
        })}
      </View>
  );
};

export default NavigationCircle;
