import React from 'react';
import { create } from 'react-test-renderer';

import App from './index';

import * as API from '../../services/api';

import Login from '../Login';
import CompaniesList from '../CompaniesList';
import AccountsList from '../AccountsList';
import TransactionsTable from '../TransactionsTable';

describe('App', () => {
  it('should add axios interceptors on componentDidMount', () => {
    const component = create(<App />);
    const instance = component.getInstance();
    API.addInterceptors = jest.fn();

    instance.componentDidMount();

    expect(API.addInterceptors).toHaveBeenCalledTimes(1);
    expect(API.addInterceptors).toHaveBeenCalledWith({
      onRequest: instance.onRequest,
      onResponse: instance.onResponse,
    });
  });

  it('should change isFetching state on request', () => {
    const component = create(<App />);
    const instance = component.getInstance();

    expect(instance.state.isFetching).toBe(false);

    instance.onRequest();

    expect(instance.state.isFetching).toBe(true);
  });

  it('should change isFetching state on response', () => {
    const component = create(<App />);
    const instance = component.getInstance();

    instance.onRequest();

    expect(instance.state.isFetching).toBe(true);

    instance.onResponse();

    expect(instance.state.isFetching).toBe(false);
  });

  describe('App: gotoNextScreen', () => {
    it('should increment activeScreen state', () => {
      const component = create(<App />);
      const instance = component.getInstance();

      expect(instance.state.activeScreen).toBe(0);

      instance.gotoNextScreen();

      expect(instance.state.activeScreen).toBe(1);
    });

    it('should not increment activeScreen state for last screen', () => {
      const component = create(<App />);
      const instance = component.getInstance();

      instance.state.activeScreen = 3;

      instance.gotoNextScreen();

      expect(instance.state.activeScreen).toBe(3);
    });
  });

  describe('App: gotoPrevScreen', () => {
    it('should decrement activeScreen state', () => {
      const component = create(<App />);
      const instance = component.getInstance();

      instance.state.activeScreen = 3;

      instance.gotoPrevScreen();

      expect(instance.state.activeScreen).toBe(2);
    });

    it('should not decrement activeScreen state for first screen', () => {
      const component = create(<App />);
      const instance = component.getInstance();

      instance.state.activeScreen = 0;

      instance.gotoPrevScreen();

      expect(instance.state.activeScreen).toBe(0);
    });
  });

  it('should set companyId state', () => {
    const companyId = 'companyId';
    const component = create(<App />);
    const instance = component.getInstance();

    expect(instance.state.companyId).toBe(null);

    instance.setCompanyId(companyId);

    expect(instance.state.companyId).toBe(companyId);
  });

  it('should set accountId state', () => {
    const accountId = 'accountId';
    const component = create(<App />);
    const instance = component.getInstance();

    expect(instance.state.accountId).toBe(null);

    instance.setAccountId(accountId);

    expect(instance.state.accountId).toBe(accountId);
  });

  describe('App: getScreen', () => {
    it('should return Login screen', () => {
      const component = create(<App />);
      const instance = component.getInstance();

      instance.state.activeScreen = 0;

      expect(instance.getScreen()).toStrictEqual(<Login />);
    });

    it('should return CompaniesList screen', () => {
      const component = create(<App />);
      const instance = component.getInstance();

      instance.state.activeScreen = 1;

      expect(instance.getScreen()).toStrictEqual(
        <CompaniesList setCompanyId={instance.setCompanyId} />
      );
    });

    it('should return AccountsList screen', () => {
      const component = create(<App />);
      const instance = component.getInstance();

      instance.state.activeScreen = 2;

      expect(instance.getScreen()).toStrictEqual(
        <AccountsList setAccountId={instance.setAccountId} />
      );
    });

    it('should return TransactionsTable screen', () => {
      const component = create(<App />);
      const instance = component.getInstance();

      instance.state.activeScreen = 3;

      expect(instance.getScreen()).toStrictEqual(<TransactionsTable />);
    });
  });
});
