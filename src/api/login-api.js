import axios from 'axios';
import {getBaseApiUrl} from "./base-api";

export const login = (formData) => {
  return axios.post(getBaseApiUrl() + '/login', formData);
};

export const register = (formData) => {
  return axios.post(getBaseApiUrl() + '/register', formData);
};

export const refresh = (token) => {
  return axios.post(
    getBaseApiUrl() + '/refresh',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
