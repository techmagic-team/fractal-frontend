import axios from 'axios';

import {
  getAccessToken,
  getCompanies,
  getBankAccounts,
  getTransactions,
  setAuthHeader
} from '../services/api';

jest.mock('axios');

axios.mockImplementation(() => {
  return {
    defaults: {
      baseURL: undefined
    },
    post: jest.fn(),
    get: jest.fn()
  };
});

describe('API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should axios post on getAccessToken', () => {
    getAccessToken();

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/v1/token');
  });

  it('should axios get on getCompanies', () => {
    getCompanies();

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/v1/companies');
  });

  it('should axios get on getBankAccounts', () => {
    const params = {
      bankId: 'bankId',
      companyId: 'companyId'
    };
    getBankAccounts(params);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `/v1/bank/${params.bankId}/accounts?companyId=${params.companyId}`
    );
  });

  it('should axios get on getTransactions', () => {
    const params = {
      bankId: 'bankId',
      companyId: 'companyId',
      accountId: 'accountId'
    };
    getTransactions(params);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `/v1/bank/${params.bankId}/accounts/${
        params.accountId
      }/transactions?companyId=${params.companyId}`
    );
  });

  it('should set default authorization header', () => {
    const accessToken = 'accessToken';
    setAuthHeader(accessToken);

    expect(axios.defaults.headers.common.Authorization).toBe(accessToken);
  });
});
