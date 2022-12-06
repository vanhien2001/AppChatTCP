import axiosClient from './axiosClient';

const authAPI = {
  login: async (username: string, password: string): Promise<any> => {
    const url = '/api/User/BearerToken';
    const dataReq = {
      userName: username,
      password,
    };
    const res = axiosClient.post(url, dataReq);
    return res;
  },

  register: async (
    name: string,
    username: string,
    password: string,
    email: string,
  ): Promise<any> => {
    const url = '/api/User';
    const dataReq = {
      name,
      userName: username,
      password,
      email,
    };
    const res = axiosClient.post(url, dataReq);
    return res;
  },
};

export default authAPI;
