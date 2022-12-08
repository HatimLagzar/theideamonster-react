import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const getUserDelegables = () => {
  return axios.get(getBaseApiUrl() + '/delegables', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const createDelegable = (formData) => {
  return axios.post(getBaseApiUrl() + '/delegables', formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const updateDelegable = (id, name) => {
  return axios.post(
    getBaseApiUrl() + '/delegables/' + id,
    {
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};
