import { user } from "data/http-request/user-api";

const UserService = function() {
  this.api = user;
};

UserService.prototype.updatePassword = async function(
  oldPassword,
  newPassword
) {
  try {
    return await this.api.updatePassword(oldPassword, newPassword);
  } catch (error) {
    throw error;
  }
};

UserService.prototype.validatePasswordForCheck = function(
  password,
  passwordForCheck
) {
  return password === passwordForCheck;
};

export const userService = new UserService();
