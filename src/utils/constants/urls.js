export const RETURN_URL_AFTER_SUCCESSFUL_SUBSCRIPTION = (() => {
  const env = process.env.NODE_ENV
  if (env === "development") {
    return 'http://127.0.0.1:3000/subscription-success';
  } else if (env === "production") {
    // do something
  }
})();
