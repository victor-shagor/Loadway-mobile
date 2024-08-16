import React, { createContext, useContext } from "react";

type OnboardingContextType = {
  setIsFirstLaunch: (value: boolean) => void;
  isFirstLaunch: boolean | null;
  color: string;
  setColor: (value: string) => void;
  login: boolean;
  setLogin: (value: boolean) => void;
  loginDetails: { email: string; password: string };
  setLoginDetails: (value: { email: string; password: string }) => void;
  changePasswordDetails: { email: string };
  setChangePasswordDetails: (value: { email: string }) => void;
  resetPassword: {
    email: string;
    initialLogin: boolean;
    code: string;
    newPassword: string;
  };
  setResetPassword: (value: {
    email: string;
    initialLogin: boolean;
    code: string;
    newPassword: string;
  } ) => void;
};
const OnboardingContext = createContext<OnboardingContextType | null>(null);

export default OnboardingContext;

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
