import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationCircle from "./NavigationCircle";
import { useOnboarding } from "@/src/hooks/isFirstLaunch";
// import Animated, {FadeIn, FadeInLeft, useSharedValue} from "react-native-reanimated";



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

  const  context = useOnboarding();

;
  const navigation = () => {
    if (id === 1) {
      setPosition(100);
    } else if (id === 2) {
      setPosition(200);
    } else {
      setPosition(0);
      if(context){
        const setIsFirstLaunch = context.setIsFirstLaunch;
        setIsFirstLaunch(false);
      }
    }
  };

  // const margin = useSharedValue(0);

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
        <Text 
        className=" text-[#F6411B] text-[40px] px-5 font-bold mt-14 relative z-20">
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
