import axios from 'axios';
import authService from '../services/auth/AuthService';
import { getBaseApiUrl } from './base-api';

export const storeInCalendar = (basketId, taskId, startDate, endDate) => {
  const formData = new FormData();
  formData.set('basket_id', basketId);
  if (taskId) {
    formData.set('task_id', taskId);
  }
  formData.set('starts_at', startDate);
  formData.set('ends_at', endDate);

  return axios.post(getBaseApiUrl() + '/calendar', formData, {
    crossDomain: true,
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const updateInCalendar = (id, basketId, taskId, startDate, endDate) => {
  const formData = new FormData();
  formData.set('basket_id', basketId);
  if (taskId) {
    formData.set('task_id', taskId);
  }
  formData.set('starts_at', startDate);
  formData.set('ends_at', endDate);

  return axios.post(getBaseApiUrl() + '/calendar/' + id, formData, {
    crossDomain: true,
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const getAllInCalendar = (date) => {
  return axios.get(getBaseApiUrl() + '/calendar/filter/' + date, {
    crossDomain: true,
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const getItemById = (id) => {
  return axios.get(getBaseApiUrl() + '/calendar/' + id, {
    crossDomain: true,
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const deleteItemFromCalendar = (id) => {
  return axios.delete(getBaseApiUrl() + '/calendar/' + id, {
    crossDomain: true,
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};
