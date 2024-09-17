import { getAccessToken } from "./RetrieveAccessToken";

export const requestPasswordChange = `/auth/forgot-password`;
export const ChangePassword = `/auth/change-password`;
export const LoginUser = `/auth/login`;
export const getCurrentUser = `/user/current`;
export const getAllTransactions = `/transaction/credit`;
export const getUserDueBills = `/user/due_bills`;
export const payUserBills = `/user/bills/pay`;
export const getComplaints = `/complaints`;

// export const headers = {
//     Authorization:
//       userAccessToken
//   };

export const createHeaders = async () => {
  const userAccessToken = await getAccessToken();
  const headers = {
    Authorization: userAccessToken,
  };
  return headers;
};
