import { axioswrapper } from "./axios-wrapper";

const Mail = function(axioswrapper) {
  this.axios = axioswrapper;
};

Mail.prototype.submit = async function() {
  try {
    return await this.axios.getAxios().get("/api/mail/submit");
  } catch (error) {
    throw error;
  }
};

export const mail = new Mail(axioswrapper);
