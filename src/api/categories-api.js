import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const getUserCategories = () => {
  return axios.get(getBaseApiUrl() + '/categories', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const createCategory = (name) => {
  const formData = new FormData();
  formData.set('name', name);

  return axios.post(getBaseApiUrl() + '/categories', formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};
