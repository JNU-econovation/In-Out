import { user } from "data/http-request/user-api";

const UserService = function() {
  this.api = user;
};

UserService.prototype.updatePassword = async function(
  oldPassword,
  newPassword
) {
  try {
    return await this.api.update(oldPassword, newPassword);
  } catch (error) {
    throw error;
  }
};

export const userService = new UserService();
