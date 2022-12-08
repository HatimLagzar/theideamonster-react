import axios from 'axios';
import {getBaseApiUrl} from "./base-api";

export const login = (formData) => {
  return axios.post(getBaseApiUrl() + '/login', formData, {
    crossDomain: true,
  });
};

export const register = (formData) => {
  return axios.post(getBaseApiUrl() + '/register', formData, {
    crossDomain: true,
  });
};

export const refresh = (token) => {
  return axios.post(
    getBaseApiUrl() + '/refresh',
    {},
    {
      crossDomain: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
