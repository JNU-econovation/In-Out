import axios from "axios";

class AxiosWrapper {
  constructor() {
    this.axios = axios;
  }

  getAxios() {
    return this.axios.create();
  }
}
export const axioswrapper = new AxiosWrapper();
