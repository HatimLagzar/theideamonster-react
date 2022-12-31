export const getBaseApiUrl = () => {
  const env = process.env.NODE_ENV;
  if (env === 'development') {
    return 'http://127.0.0.1:8000/api';
  } else {
    return 'https://api.ideamonster.net/api';
  }
};

export const getBaseUrl = () => {
  const env = process.env.NODE_ENV;
  if (env === 'development') {
    return 'http://127.0.0.1:3000';
  } else {
    return 'https://ideamonster.net';
  }
};
