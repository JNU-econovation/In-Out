import { axioswrapper } from "./axios-wrapper";

const Auth = function(axioswrapper) {
  this.axios = axioswrapper;
};

Auth.prototype.login = async function(memberId, password) {
  try {
    return await this.axios
      .getAxios()
      .post("/api/login", { memberId, password });
  } catch (error) {
    throw error;
  }
};

export const auth = new Auth(axioswrapper);
