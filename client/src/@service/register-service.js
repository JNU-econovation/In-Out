import { register } from "data/http-request/register";
import { BrowserStorage } from "data/browser-storage";
import { tokenMapper } from "data/browser-storage/type-mapper/token-mapper";
import { StorageType } from "enum/storage";
import jwt from "jsonwebtoken";

const RegisterService = function() {
  this.registerApi = register;
  this.storage = new BrowserStorage("token", StorageType.LOCAL, tokenMapper);
};

RegisterService.prototype.register = async function(reason) {
  try {
    const storage = this.storage.get();
    const data = jwt.decode(storage.token);
    return await this.registerApi.post(data.memberId, reason);
  } catch (error) {
    throw error;
  }
};

RegisterService.prototype.update = async function(reason) {
  try {
    const storage = this.storage.get();
    const { memberId } = jwt.decode(storage.token);
    return await this.registerApi.update(memberId, reason);
  } catch (error) {
    throw error;
  }
};

RegisterService.prototype.get = async function() {
  try {
    const storage = this.storage.get();
    const { memberId } = jwt.decode(storage.token);
    const result = await this.registerApi.get(memberId);
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};

export const registerService = new RegisterService();
