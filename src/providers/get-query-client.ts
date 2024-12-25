import { AppStateStatus, Platform } from "react-native";
import {
  QueryClient,
  focusManager,
} from '@tanstack/react-query'

export const onAppStateChange = (status: AppStateStatus) => {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
};

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});
