import { View, Dimensions  } from "react-native";
import {useState} from "react";
import OnboardingComponent from "@/src/components/onboarding/OnboardingComponent";
import { useOnboarding } from "@/src/hooks/isFirstLaunch";

const Onboarding = () => {


  const [position, setPosition] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const calculatedPosition = screenWidth * (position / 100);
  console.log(calculatedPosition,screenWidth)


  return (
    <View 
     style={{ position: 'relative', right: position , flexDirection: 'row'}}
     >
      <OnboardingComponent
        bigText={`Seamless living at ${"\n"} your tips`}
        smallText={`Effortlessly manage your house/estate dues, get timely reminders for rent and service charges`}
        setPosition={setPosition}
        id={1}
        postion={position}
      />
      <OnboardingComponent
        bigText={`Stay on top of your ${"\n"} finances`}
        smallText={`Never miss a payment again! Take control of your financial peace and live worry-free.`}
        setPosition={setPosition}
        id={2}
        postion={position}
      />
      <OnboardingComponent
        bigText={`Empowerment ${"\n"} through ${"\n"} connectivity`}
        smallText={`With our app, you're not just a tenant; you're a key player in shaping your living environment.`}
        setPosition={setPosition}
        id={3}
        postion={position}
      />
    </View>
  );
};

export default Onboarding;
