import { axioswrapper } from "./axios-wrapper";

const User = function(axioswrapper) {
  this.axios = axioswrapper;
};

User.prototype.update = async (
  memberId,
  oldPassword,
  newPassword,
  newPasswordForCheck
) => {
  try {
    return await this.axios.getAxios().put("/api/mypage/", {
      memberId,
      oldPassword,
      newPassword,
      newPasswordForCheck
    });
  } catch (error) {
    return;
  }
};

export const user = new User(axioswrapper);
