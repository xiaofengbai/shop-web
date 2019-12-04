/* eslint-disable no-unused-expressions */
import { getList, removeData } from '@/services/api';

const Model = {
  namespace: 'list',
  state: {
    data: [],
    total: 0,
  },
  reducers: {
    setstate(state, { data, total }) {
      return { ...state, ...{ data, total } };
    },
  },
  effects: {
    *getList({ payload }, { call, put }) {
      const { data, success, total } = yield call(getList, payload);
      if (success) {
        yield put({
          type: 'setstate',
          data,
          total,
        });
      }
    },
    *removeData({ id, callback }, { call }) {
      const { success } = yield call(removeData, id);
      if (success) {
        callback && callback();
      }
    },
  },
};
export default Model;
