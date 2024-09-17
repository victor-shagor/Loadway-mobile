import Toast, { ToastType } from "react-native-toast-message";

export const ToastNotification = (
  type: ToastType,
  firstText: string,
  secondText?: string
) => {
  Toast.show({
    type: type,
    text1: firstText,
    text2: secondText,
  });
};
