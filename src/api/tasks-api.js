import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const toggleTaskStatus = (taskId) => {
  return axios.patch(
    getBaseApiUrl() + '/tasks/' + taskId + '/status',
    {},
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

export const createTask = (basketId, content, type = 1) => {
  const formData = new FormData();
  if (type === 2) {
    formData.set('audio', content);
  } else {
    formData.set('content', content);
  }

  formData.set('type', type);

  return axios.post(getBaseApiUrl() + '/tasks/' + basketId, formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const updateTask = (taskId, content) => {
  const formData = new FormData();
  formData.set('content', content);

  return axios.post(
    getBaseApiUrl() + '/tasks/' + taskId + '/update',
    formData,
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};

export const deleteTask = (taskId) => {
  return axios.delete(getBaseApiUrl() + '/tasks/' + taskId, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};
