import { routerRedux } from 'dva/router';
import { stringify } from 'querystring';
import { fakeAccountLogin, getFakeCaptcha, registe } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
const Model = {
  namespace: 'login',
  state: {
    isLogin: false,
  },
  effects: {
    *login({ payload, callBack }, { call, put }) {
      const response = yield call(fakeAccountLogin, {
        email: payload.email,
        password: payload.password,
      });
      yield put({
        type: 'changeLoginStatus',
        payload: { ...response },
      });

      if (response.success) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        yield put(routerRedux.replace(redirect || '/'));
      } else if (callBack) {
        callBack(response.success, response.msg);
      }
    },

    *registe({ payload, callBack }, { call, put }) {
      const { success, msg } = yield call(registe, {
        email: payload.email,
        password: payload.password,
        captcha: payload.captcha,
      });
      if (success) {
        yield put({
          type: 'setRegiste',
          payload: { registeStatus: true },
        });
      }
      if (callBack) callBack(success, msg);
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      const { redirect } = getPageQuery(); // redirect

      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.role);
      return { ...state, isLogin: true };
    },
    setRegiste(state, { registeStatus }) {
      // setAuthority(payload.role);
      return { ...state, registeStatus };
    },
  },
};
export default Model;
