import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const getAllMeditationTracks = () => {
  return axios.get(getBaseApiUrl() + '/meditation', {
    crossDomain: true,
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};
