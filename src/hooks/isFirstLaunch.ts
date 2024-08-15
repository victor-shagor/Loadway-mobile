import React, { createContext, useContext } from 'react';

type OnboardingContextType = {
    setIsFirstLaunch: (value : boolean)=> void;
    isFirstLaunch: boolean | null;
    color: string,
    setColor: (value: string)=> void;
    login: boolean;
    setLogin: (value : boolean)=> void;
}
 const OnboardingContext = createContext< OnboardingContextType | null>(null);

 export default OnboardingContext;

export const useOnboarding = () => {
    const context = useContext(OnboardingContext);
    if (context === undefined) {
        throw new Error('useOnboarding must be used within an OnboardingProvider');
    }
    return context;
};



