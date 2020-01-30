import { axioswrapper } from "./axios-wrapper";

const User = function(axioswrapper) {
  this.axios = axioswrapper;
};

User.prototype.updatePassword = async function(oldPassword, newPassword) {
  try {
    return await this.axios.getAxios().put("/api/mypage/", {
      oldPassword,
      newPassword
    });
  } catch (error) {
    throw error;
  }
};

export const user = new User(axioswrapper);
