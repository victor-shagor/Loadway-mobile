import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import NavigationCircle from "./NavigationCircle";
import { useOnboarding } from "@/src/hooks/isFirstLaunch";
import { useEffect } from "react";

type propsComponent = {
  bigText: string;
  smallText: string;
  setPosition: (value: number) => void;
  id: number;
  postion: number;
};
const icon = require("@/src/assets/icons/LoadWayIcon.png");

const OnboardingComponent: React.FC<propsComponent> = ({
  bigText,
  smallText,
  setPosition,
  id,
  postion,
}: propsComponent) => {

  const context = useOnboarding();
  const screenWidth = Dimensions.get('window').width;

  const navigation = () => {
    if (id === 1) {
      const calculatedPosition = screenWidth * id;
      setPosition(calculatedPosition);
    } else if (id === 2) {
      const calculatedPosition = screenWidth * id;
      setPosition(calculatedPosition);
    } else {
      const calculatedPosition = screenWidth * id;
      setPosition(calculatedPosition);
      if (context) {
        const setIsFirstLaunch = context.setIsFirstLaunch;
        setIsFirstLaunch(false);
      }
    }
    console.log(postion, id);
  };
  

  return (
    <View className=" bg-red-200 relative h-screen w-screen">
      <View className=" absolute flex-1 bg-[#322b11cb] h-screen top-0 z-10 right-0 w-full"></View>
      <View
        style={[{ flexDirection: "row" }]}
        className=" justify-between mx-5 my-10 "
      >
        <Image source={icon} className=" relative z-20" />
        <TouchableOpacity className=" relative z-20 ">
          <Text
            className=" text-white relative z-20 text-md font-medium"
            onPress={() => {
              // Handle the button press here
              console.log("Button pressed!");
            }}
          >
            Skip
          </Text>
        </TouchableOpacity>
      </View>
      <View className="">
        <Text className=" text-[#F6411B] text-[40px] px-5 font-bold mt-14 relative z-20">
          {bigText}
        </Text>
      </View>
      <View className="">
        <Text className=" text-[#EBC5A0] text-[14px] px-5 font-light mt-14 relative z-20">
          {smallText}
        </Text>
      </View>
      <View className=" relative mt-[6vh] z-50 flex-row">
        <View className=" relative z-50">
          <NavigationCircle id={id} />
        </View>
        <TouchableOpacity
          className=" bg-[#F6411B] w-[24vw] absolute right-0 rounded-l-full
          z-50
          "
          onPress={navigation}
        >
          <Text className=" font-bold text-white text-center py-4">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingComponent;
