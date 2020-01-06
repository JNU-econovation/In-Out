import { auth } from "http-request/auth-api";

const AuthService = function() {
  this.authApi = auth;
};

AuthService.prototype.login = async function(id, password) {
  try {
    return await this.authApi.login(id, password);
  } catch (error) {
    throw error;
  }
};

export const authService = new AuthService();
