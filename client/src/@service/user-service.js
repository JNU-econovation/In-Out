import { user } from "data/http-request/user-api";
import { BrowserStorage } from "data/browser-storage";
import { tokenMapper } from "data/browser-storage/type-mapper/token-mapper";
import { StorageType } from "enum/storage";
import jwt from "jsonwebtoken";

const UserService = function() {
  this.api = user;
  this.storage = new BrowserStorage("token", StorageType.LOCAL, tokenMapper);
};

UserService.prototype.getUser = function() {
  try {
    const storage = this.storage.get();
    return jwt.decode(storage.token);
  } catch (error) {
    throw error;
  }
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
