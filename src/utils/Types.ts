// type actionProps = Pick<ForgotPasswordBtnProps, 'action'>;

import { SvgProps } from "react-native-svg";

// type actionProps = Omit<ForgotPasswordBtnProps, 'action'>;
export type PassWordManagementProps = {
  big_Text: string;
  small_text: string;
  btn_text: string;
  type: "updatepasword" | "forgotpassword";
  actionForCancelBtn: "backToLogin";
  actionForSendBtn: "savepassword" | "resetpassword";
};

export type ForgotPasswordBtnProps = {
  bg_color: string;
  border_color: string;
  text_color: string;
  text: string;
  type: "modal" | "forgotpassword" | "updatepasword";
  action:
    | "cancelModal"
    | "sendEmailToBackend"
    | "backToLogin"
    | "resetpassword"
    | "savepassword"
    | "actionForCancelBtn"
    | "actionForSendBtn";
  setModalVisible?: (value: boolean) => void;
};

export type ApiResponse<T> = {
  data: T | Array<T>;
  status: number;
};

export type ApiError = {
  message: string;
  status: number;
};

export type ExtendedSvgProps = SvgProps & {
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
};

