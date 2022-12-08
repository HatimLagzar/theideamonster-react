import axios from 'axios';
import {getBaseApiUrl} from "./base-api";

export const sendLink = (email) => {
  const formData = new FormData();
  formData.set('email', email);

  return axios.post(getBaseApiUrl() + '/recover-link', formData, {
    crossDomain: true,
  });
};

export const resetPassword = (email, password, passwordConfirmation, token) => {
  const formData = new FormData();
  formData.set('email', email);
  formData.set('password', password);
  formData.set('password_confirmation', passwordConfirmation);
  formData.set('token', token);

  return axios.post(getBaseApiUrl() + '/reset-password', formData, {
    crossDomain: true,
  });
};
