import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const getClientSecret = (abortController) => {
  return axios.post(
    getBaseApiUrl() + '/subscriptions/intent',
    {},
    {
      crossDomain: true,
      signal: abortController.signal,
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

export const confirmSubscription = (setupIntent, abortController) => {
  return axios.post(
    getBaseApiUrl() + '/subscriptions/confirm/' + setupIntent,
    {},
    {
      crossDomain: true,
      signal: abortController.signal,
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};
