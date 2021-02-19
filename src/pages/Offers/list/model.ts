import { Effect, Reducer, formatMessage } from 'umi';
import { query } from '@/services/offers';
import { message } from 'antd';

export interface StateType {
  list: any[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    // deleteSchool: Effect;
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
    // *deleteSchool({ payload }, { call, put }) {
    //   const { response } = yield call(deleteSchool, payload);
    //   if(response.ok){
    //     message.success(formatMessage({ id: 'messages.delete.school.success' }));
    //     const { data } = yield call(query);
    //     yield put({
    //       type: 'queryList',
    //       payload: Array.isArray(data) ? data : [],
    //     });
    //   } else {
    //     message.error(formatMessage({ id: 'messages.delete.school.error' }));
    //   }
    // },
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
