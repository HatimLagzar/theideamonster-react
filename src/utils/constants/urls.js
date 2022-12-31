import { getBaseUrl } from "../../api/base-api";

export const RETURN_URL_AFTER_SUCCESSFUL_SUBSCRIPTION = (() => {
  return getBaseUrl() + '/subscription-success';
})();
