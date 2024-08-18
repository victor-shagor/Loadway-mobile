import useOnboardingContext from "@src/utils/Context";

const AuthInputs = () => {
  const {
    setLogin,
    changePasswordDetails,
    setChangePasswordDetails,
    loginDetails,
    setLoginDetails,
    resetPassword,
    setResetPassword,
  } = useOnboardingContext();

  return {
    setLogin,
    changePasswordDetails,
    setChangePasswordDetails,
    loginDetails,
    setLoginDetails,
    resetPassword,
    setResetPassword,
  };
};

export default AuthInputs;
