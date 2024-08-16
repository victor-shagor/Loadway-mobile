// type actionProps = Pick<ForgotPasswordBtnProps, 'action'>;
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
    type: "modal"| "forgotpassword" | "updatepasword";
    action:
      | "cancelModal"
      | "sendEmailToBackend"
      | "backToLogin"
      | "resetpassword"
      | "savepassword"
      | "actionForCancelBtn"
      | "actionForSendBtn";
    setModalVisible?: (value: boolean) => void;
  }