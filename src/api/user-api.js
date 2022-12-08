import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const fetchAuthenticatedUserInfo = () => {
  return axios.get(getBaseApiUrl() + '/me', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};
