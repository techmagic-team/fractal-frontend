import axios from 'axios';

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL =
    'https://fnzeosv91l.execute-api.eu-west-1.amazonaws.com/dev';
}

export const addInterceptors = ({ onRequest, onResponse }) => {
  axios.interceptors.request.use(config => {
    onRequest();

    return config;
  });

  axios.interceptors.response.use(
    response => {
      onResponse();

      return response;
    },
    error => {
      onResponse();

      return Promise.reject(error);
    }
  );
};

export const getAccessToken = () => {
  return axios.post('/v1/token');
};

export const setAuthHeader = accessToken => {
  axios.defaults.headers.common.Authorization = `${accessToken}`;
};

export const getCompanies = () => {
  return axios.get('/v1/companies');
};

export const getBankAccounts = ({ bankId, companyId }) => {
  return axios.get(`/v1/bank/${bankId}/accounts?companyId=${companyId}`);
};

export const getTransactions = ({ bankId, companyId, accountId }) => {
  return axios.get(
    `/v1/bank/${bankId}/accounts/${accountId}/transactions?companyId=${companyId}`
  );
};
