import { IBaseResponse, ISession, IUser } from "@/types";

import { defaultRequest } from "@/lib/axios";

// import { IChangeInfoRequest } from "@/pages/settings/general/types";
// import { IChangePasswordRequest } from "@/pages/settings/password/types";

// const changePassword = (requestData: IChangePasswordRequest) =>
//   defaultRequest.put("/account/password", requestData);

// const changePhoto = (file: File) => {
//   const form = new FormData();
//   form.append("photo", file);

//   return defaultRequest.put("/account/picture", form, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

// const getUseForList = () =>
//   defaultRequest
//     .get<IBaseResponse<IDictionary[]>>("/account/using")
//     .then(({ data }) => data.data);

// const getActivityList = () =>
//   defaultRequest
//     .get<IBaseResponse<IDictionary[]>>("/account/activity")
//     .then(({ data }) => data.data);

// const changeInfo = (requestData: IChangeInfoRequest) =>
//   defaultRequest.put<IBaseResponse<IUser>>(
//     "/account/personal-info",
//     requestData
//   );

/**
 * Get user info - THIS FUNCTION IS NOT IMPLEMENTED YET.
 * @returns IUser
 */
const getUserInfo = () =>
  defaultRequest
    .get<IBaseResponse<IUser>>("/auth/get-user")
    .then(({ data }) => data.data);

/**
 * Get session info
 * @returns ISession
 */
const getSession = () => defaultRequest.get<IBaseResponse<ISession>>("/auth/get-session").then(({ data }) => data.data);

const logout = () => defaultRequest.post("/account/logout");

export const accountService = {
  // changePassword,
  // changePhoto,
  // changeInfo,
  //getUserInfo,
  getSession,
  // getUseForList,
  // getActivityList,
  logout,
};
