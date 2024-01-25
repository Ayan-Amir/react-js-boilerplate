import { ACCESS_TOKEN, getLocalStorageItem } from '@utils';
import axios from 'axios';
import * as caseConverter from 'change-object-case';

const options = { recursive: true, arrayRecursive: true };

export function useSetupAxios() {
  axios.defaults.baseURL = `${import.meta.env.VITE_APP_BASE_URL}`;

  axios.interceptors.request.use(config => {
    const accessToken = getLocalStorageItem(ACCESS_TOKEN);

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    if (!(config?.data instanceof FormData)) {
      const caseConvertedData = caseConverter.snakeKeys(config?.data, options);
      config.data = caseConvertedData;
    }

    const caseConvertedData = caseConverter.snakeKeys(config.params);
    config.params = caseConvertedData;

    return config;
  });

  axios.interceptors.response.use(
    response => {
      const caseConvertedData = caseConverter.camelKeys(response?.data, options);
      response.data = caseConvertedData;
      return response;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return;
}
