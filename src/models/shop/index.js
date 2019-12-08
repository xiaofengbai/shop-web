/* eslint-disable no-unused-expressions */
import { getList, removeData, updateShop, createShop } from '@/services/api';

const Model = {
  namespace: 'shopList',
  state: {
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
  },
  reducers: {
    setstate(state, { data, total, page, pageSize }) {
      return { ...state, ...{ data, total, page, pageSize } };
    },
  },
  effects: {
    *getList({ payload }, { call, put, select }) {
      const states = yield select(state => state.shopList);
      const parames = {
        ...{
          page: states.page,
          pageSize: states.pageSize,
        },
        ...payload,
      };
      const { data, success, total } = yield call(getList, parames);
      if (success) {
        yield put({
          type: 'setstate',
          data,
          total,
          page: parames.page,
          pageSize: parames.pageSize,
        });
      }
    },
    *createShop({ payload, callback }, { call, put }) {
      const { success } = yield call(createShop, payload);
      if (success) {
        yield put.resolve({
          type: 'getList',
        });
        callback && callback();
      }
    },
    *removeData({ id }, { call, select, put }) {
      const { success } = yield call(removeData, id);
      if (success) {
        // eslint-disable-next-line prefer-const
        let { page, pageSize, total } = yield select(state => state.shopList);
        if ((page - 1) * pageSize + 1 === total && page > 1) {
          page -= 1;
        }
        yield put.resolve({
          type: 'getList',
          payload: { page },
        });
      }
    },
    *updateShop({ payload, callback }, { call, put }) {
      const { success } = yield call(updateShop, payload);
      if (success) {
        yield put.resolve({
          type: 'getList',
        });
        callback && callback();
      }
    },
  },
};
export default Model;
