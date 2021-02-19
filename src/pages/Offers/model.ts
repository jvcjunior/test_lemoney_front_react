import { Effect, Reducer, formatMessage, history} from 'umi';
import { message } from 'antd';
import { getOffer , addOffer, editOffer } from '@/services/offers'

export interface StateType {
  offer?: any;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchOffer: Effect;
    addOffer: Effect;
    editOffer: Effect;
  };
  reducers: {
    setOffer: Reducer<StateType>;
  };
}
const Model: ModelType = {
  namespace: 'offerForm',

  state: {
    offer: undefined,
  },

  effects: {

    *fetchOffer({ payload }, { call, put }) {
      const { data } = yield call(getOffer, payload);
      yield put({
        type: 'setOffer',
        payload: data.data
      });
    },
    *addOffer({ payload }, { call, put }) {
      const { response } = yield call(addOffer, payload);
      if (response.ok) {
        message.success(formatMessage({ id: 'messages.add.Offer.success' }));
        yield put({
          type: 'setOffer',
          payload: undefined
        });
        yield put({
          type: 'Offer/fetch',
        });
        history.replace('/offers');
      }else {
        message.error(formatMessage({ id: 'messages.add.Offer.error' }));
      }
    },
    *editOffer({ payload }, { call, put }) {
      const { response } = yield call(editOffer, payload);
      if (response.ok) {
        message.success(formatMessage({ id: 'messages.edit.Offer.error' }));
        history.replace('/offers');
        yield put({
          type: 'setOffer',
          payload: undefined
        });
      } else {
        message.error(formatMessage({ id: 'messages.edit.Offer.error' }));
      }
    },
  },
  reducers: {
    setOffer(state, action) {
      return {
        ...state,
        offer: action.payload,
      };
    },
  },
};

export default Model;
