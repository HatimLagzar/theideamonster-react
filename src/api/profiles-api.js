import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const updateProfile = (id, name, job, avatar) => {
  return axios.post(
    getBaseApiUrl() + '/profiles/' + id,
    {
      name,
      job,
      avatar,
    },
    {
      crossDomain: true,
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};
