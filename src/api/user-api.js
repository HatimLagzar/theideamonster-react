import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const fetchAuthenticatedUserInfo = () => {
  return axios.get(getBaseApiUrl() + '/me', {
    crossDomain: true,
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};
