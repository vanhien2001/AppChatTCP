import axios from 'axios';
import { getUserToken } from '../Utils/tokenHandler';

const axiosClient = axios.create({
  baseURL: 'http://192.168.31.164:5000',
  headers: {
    'Content-Type': 'application/json',
    accept: 'text/plain',
  },
});

axiosClient.interceptors.request.use(
  config => {
    // const accessToken = getUserToken();
    // if (accessToken && config.headers) {
    //   config.headers['Authorization'] = `Bearer ${accessToken}`;
    // }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  res => {
    if (res && res.data) {
      return res.data;
    }
    return res;
  },
  error => {
    console.log(error.response);
    return Promise.reject(error.response ? error.response.data : {});
  },
);

export default axiosClient;
