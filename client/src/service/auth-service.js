import { auth } from "http-request/auth-api";
import { BrowserStorage } from "browser-storage";
import { tokenMapper } from "browser-storage/type-mapper/token-mapper";
import { StorageType } from "enum/storage";

const AuthService = function() {
  this.authApi = auth;
  this.storage = new BrowserStorage("token", StorageType.LOCAL, tokenMapper);
};

AuthService.prototype.login = async function(id, password) {
  try {
    await this.authApi.login(id, password);
    this.storage.set(result);
    return "성공";
  } catch (error) {
    throw error;
  }
};

export const authService = new AuthService();
