import { useEffect } from 'react';
import { getCurrentUser } from "@src/api/user";
import useOnboardingContext from "@src/utils/Context";

export const useCurrentUser = () => {
  const { setCurrentUser } = useOnboardingContext();

  const updateCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  return updateCurrentUser;
};
