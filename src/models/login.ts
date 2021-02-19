import { formatMessage } from './../.umi/plugin-locale/localeExports';
import { stringify } from 'querystring';
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import { authorize } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import { dropToken, setToken } from '@/utils/token';

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
};

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    // *login({ payload }, { call, put }) {
    //   const response = yield call(authorize, payload);
    //   yield put({
    //     type: 'changeLoginStatus',
    //     payload: response,
    //   });
    //   // Login successfully
    //   if (response.status === 'ok') {
    //     const urlParams = new URL(window.location.href);
    //     const params = getPageQuery();
    //     message.success('🎉 🎉 🎉  登录成功！');
    //     let { redirect } = params as { redirect: string };
    //     if (redirect) {
    //       const redirectUrlParams = new URL(redirect);
    //       if (redirectUrlParams.origin === urlParams.origin) {
    //         redirect = redirect.substr(urlParams.origin.length);
    //         if (redirect.match(/^\/.*#/)) {
    //           redirect = redirect.substr(redirect.indexOf('#') + 1);
    //         }
    //       } else {
    //         window.location.href = '/';
    //         return;
    //       }
    //     }
    //     history.replace(redirect || '/');
    //   }
    // },
    *login({ payload }, { call, put }) {
      const { data, response } = yield call(authorize, payload);
      debugger
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.ok) {
        const { data: { token, user } } = data;
        localStorage.setItem('currentUser', JSON.stringify(user));
        setToken(token, 24);

        message.success(formatMessage({id: 'messages.login.success'}));
        // const urlParams = new URL(window.location.href);
        // const params = getPageQuery();
        // let { redirect } = params as { redirect: string };
        // if (redirect) {
        //   const redirectUrlParams = new URL(redirect);
        //   if (redirectUrlParams.origin === urlParams.origin) {
        //     redirect = redirect.substr(urlParams.origin.length);
        //     if (redirect.match(/^\/.*#/)) {
        //       redirect = redirect.substr(redirect.indexOf('#') + 1);
        //     }
        //   } else {
        //     window.location.href = '/';
        //     return;
        //   }
        // }
        // history.replace(redirect || '/');
        history.replace('/welcome');
      }
    },

    // logout() {
    //   const { redirect } = getPageQuery();
    //   // Note: There may be security issues, please note
    //   if (window.location.pathname !== '/user/login' && !redirect) {
    //     history.replace({
    //       pathname: '/user/login',
    //       search: stringify({
    //         redirect: window.location.href,
    //       }),
    //     });
    //   }
    // },
    logout() {
      const { redirect } = getPageQuery();
      localStorage.removeItem('currentUser');
      localStorage.removeItem('antd-pro-authority');
      dropToken();
      
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
        //TODO: rever isso aqui
        location.reload();
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
