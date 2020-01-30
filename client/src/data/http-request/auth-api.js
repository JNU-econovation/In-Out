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

Auth.prototype.logout = async function() {
  try {
    return await this.axios.getAxios().get("/api/logout");
  } catch (error) {
    throw error;
  }
};

export const auth = new Auth(axioswrapper);
