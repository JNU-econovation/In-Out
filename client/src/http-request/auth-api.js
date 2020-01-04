import { axioswrapper } from "./axios-wrapper";

const Auth = function(axioswrapper) {
  this.axios = axioswrapper;
};

Auth.prototype.login = async function(id, password) {
  try {
    return await this.axios.getAxios().post("/api/login", { id, password });
  } catch (error) {
    throw error;
  }
};

export const auth = new Auth(axioswrapper);
