import { axioswrapper } from "./axios-wrapper";
const Register = function(axioswrapper) {
  this.axios = axioswrapper;
};

Register.prototype.post = async function(memberId, reason) {
  try {
    return await this.axios
      .getAxios()
      .post("/api/enrollments/process", { memberId, reason });
  } catch (error) {
    throw error;
  }
};

Register.prototype.update = async function(memberId, reason) {
  try {
    return await this.axios
      .getAxios()
      .put("/api/enrollments/process", { memberId, reason });
  } catch (error) {
    throw error;
  }
};

Register.prototype.get = async function(memberId) {
  try {
    return await this.axios.getAxios().get(`/api/enrollments/${memberId}`);
  } catch (error) {
    throw error;
  }
};

export const register = new Register(axioswrapper);
