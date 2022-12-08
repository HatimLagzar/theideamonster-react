import axios from 'axios';
import authService from '../services/auth/AuthService';
import {getBaseApiUrl} from "./base-api";

export const getUserMilestones = () => {
  return axios.get(getBaseApiUrl() + '/milestones', {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const getRandomQuote = (abortController) => {
  return axios.get(getBaseApiUrl() + '/quotes', {
    signal: abortController.signal,
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const createMilestone = (endsAt, basketId) => {
  const formData = new FormData();
  formData.set('ends_at', endsAt);
  formData.set('basket_id', basketId);

  return axios.post(getBaseApiUrl() + '/milestones', formData, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
};

export const updateMilestone = (id, endsAt, basketId, percentage, isDone) => {
  return axios.post(
    getBaseApiUrl() + '/milestones/' + id,
    {
      ends_at: endsAt,
      basket_id: basketId,
      is_done: isDone,
      percentage,
    },
    {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    }
  );
};
