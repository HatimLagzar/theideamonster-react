import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const getUserCategories = () => {
  return axios.get(getBaseApiUrl() + '/categories', {
    crossDomain: true,
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const createCategory = (name) => {
  const formData = new FormData();
  formData.set('name', name);

  return axios.post(getBaseApiUrl() + '/categories', formData, {
    crossDomain: true,
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const deleteCategory = (id) => {
  return axios.delete(`${getBaseApiUrl()}/categories/${id}`, {
    crossDomain: true,
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};
