import { mail } from "data/http-request/mail-api";

const MailService = function() {
  this.mailApi = mail;
};

MailService.prototype.submit = async function() {
  try {
    const result = await this.mailApi.submit();
    if (result.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const mailService = new MailService();
