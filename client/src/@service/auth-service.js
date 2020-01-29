import { auth } from "data/http-request/auth-api";
import { BrowserStorage } from "data/browser-storage";
import { tokenMapper } from "data/browser-storage/type-mapper/token-mapper";
import { StorageType } from "enum/storage";

const AuthService = function() {
  this.authApi = auth;
  this.storage = new BrowserStorage("token", StorageType.LOCAL, tokenMapper);
};

AuthService.prototype.login = async function(id, password) {
  try {
    const result = await this.authApi.login(id, password);
    this.storage.set(result.data.token);
    return "성공";
  } catch (error) {
    throw error;
  }
};

AuthService.prototype.isLogined = function() {
  const token = this.storage.get();
  if (token && token["token"]) return true;
  return false;
};

AuthService.prototype.logout = async function() {
  try {
    await this.authApi.logout();
    this.storage.remove();
    return true;
  } catch (error) {
    return false;
  }
};

export const authService = new AuthService();
