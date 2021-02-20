import { Effect, Reducer, formatMessage } from 'umi';
import { query, deleteOffer, disableOffer, enableOffer } from '@/services/offers';
import { message } from 'antd';

export interface StateType {
  list: any[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    delete: Effect;
    disable: Effect;
    enable: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'offersList',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const { data: { data: items } } = yield call(query, payload);
      yield put({
        type: 'queryList',
        payload: items,
      });
    },
    *delete({ payload }, { call, put }) {
      const { data, response } = yield call(deleteOffer, payload);
      if(response.ok){
        message.success(formatMessage({ id: 'messages.delete.offer.success' }));
        yield put({
          type: 'fetch',
        });
      } else {
        message.error(formatMessage({ id: 'messages.delete.offer.error' }));
      }
    },
    *disable({ payload }, { call, put }) {
      const { data, response } = yield call(disableOffer, payload);
      if(response.ok){
        message.success(formatMessage({ id: 'messages.disabled.offer.success' }));
        yield put({
          type: 'fetch',
        });
      } else {
        message.error(formatMessage({ id: 'messages.disabled.offer.error' }));
      }
    },
    *enable({ payload }, { call, put }) {
      const { data, response } = yield call(enableOffer, payload);
      if(response.ok){
        message.success(formatMessage({ id: 'messages.enabled.offer.success' }));
        yield put({
          type: 'fetch',
        });
      } else {
        message.error(formatMessage({ id: 'messages.enabled.offer.error' }));
      }
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};

export default Model;
