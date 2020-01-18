import { user } from "data/http-request/user-api";

const UserService = function() {
  this.api = user;
};

UserService.prototype.updatePassword = async function(
  memberId,
  oldPassword,
  newPassword,
  newPasswordForCheck
) {
  try {
    return await this.api.update(
      memberId,
      oldPassword,
      newPassword,
      newPasswordForCheck
    );
  } catch (error) {
    return "에러";
  }
};
