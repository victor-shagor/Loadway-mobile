import { View } from "react-native";
import {useState} from "react";
import OnboardingComponent from "@/src/components/onboarding/OnboardingComponent";

const Onboarding = () => {

  const [position, setPostion] = useState(0);

  return (
    <View className={`flex-row relative right-[${position}vw]`}>
      <OnboardingComponent
        bigText={`Seamless living at ${"\n"} your tips`}
        smallText={`Effortlessly manage your house/estate dues, get timely reminders for rent and service charges`}
        setPosition={setPostion}
        id={1}
        postion={position}
      />
      <OnboardingComponent
        bigText={`Stay on top of your ${"\n"} finances`}
        smallText={`Never miss a payment again! Take control of your financial peace and live worry-free.`}
        setPosition={setPostion}
        id={2}
        postion={position}
      />
      <OnboardingComponent
        bigText={`Empowerment ${"\n"} through ${"\n"} connectivity`}
        smallText={`With our app, you're not just a tenant; you're a key player in shaping your living environment.`}
        setPosition={setPostion}
        id={3}
        postion={position}
      />
    </View>
  );
};

export default Onboarding;
