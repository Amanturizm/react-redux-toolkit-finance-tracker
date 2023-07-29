import axios from "axios";

const axiosApi = axios.create({
  baseURL: 'https://attractor-school-hw-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default axiosApi;