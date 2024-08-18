import { useOnboarding } from "@src/context/onboarding";

const useOnboardingContext = () => {
  const context = useOnboarding()!;
  if (!context) {
    throw new Error("An error occurred");
  }

  return context;
};

export default useOnboardingContext;
