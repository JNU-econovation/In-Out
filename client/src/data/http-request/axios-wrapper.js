import axios from "axios";
import { BrowserStorage } from "data/browser-storage";
class AxiosWrapper {
  constructor() {
    this.axios = axios;
    this.storage = new BrowserStorage("token", StorageType.LOCAL, tokenMapper);
  }

  getAxios() {
    const storage = this.storage.get();
    if (storage.token) return this.axios.create();
    return this.axios.create({
      headers: {
        "x-access-token": storage.token
      }
    });
  }
}
export const axioswrapper = new AxiosWrapper();
