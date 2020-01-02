import axios from "axios";

class AxiosWrapper {
  constructor() {
    this.axios = axios;
  }

  getAxios() {
    return this.axios.create();
  }
}
const axioswrapper = new AxiosWrapper();
export default axioswrapper;
