import { Effect, Reducer, formatMessage, history} from 'umi';
import { message } from 'antd';
// import { getSchool , addSchool, editSchool } from '@/services/offers'

export interface StateType {
  school?: any;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    // fetchSchool: Effect;
    // addSchool: Effect;
    // editSchool: Effect;
  };
  reducers: {
    setSchool: Reducer<StateType>;
  };
}
const Model: ModelType = {
  namespace: 'companySchoolForm',

  state: {
    school: undefined,
  },

  effects: {
    // // *fetchCompanies({ payload }, { call, put }) {
    // //   const { data } = yield call(getCompanies, payload);
    // //   yield put({
    // //     type: 'setCompanies',
    // //     payload: data,
    // //   });
    // // },
    // *fetchSchool({ payload }, { call, put }) {
    //   const { data } = yield call(getSchool, payload);
    //   yield put({
    //     type: 'setSchool',
    //     payload: data
    //   });
    // },
    // *addSchool({ payload }, { call, put }) {
    //   const { response } = yield call(addSchool, payload);
    //   if (response.ok) {
    //     message.success(formatMessage({ id: 'messages.add.school.success' }));
    //     yield put({
    //       type: 'setSchool',
    //       payload: undefined
    //     });
    //     yield put({
    //       type: 'school/fetch',
    //     });
    //     history.replace('/company/schools');
    //   }else {
    //     message.error(formatMessage({ id: 'messages.add.school.error' }));
    //   }
    // },
    // *editSchool({ payload }, { call, put }) {
    //   const { response } =yield call(editSchool, payload);
    //   if (response.ok) {
    //     message.success(formatMessage({ id: 'messages.edit.school.error' }));
    //     history.replace('/company/schools');
    //     yield put({
    //       type: 'setSchool',
    //       payload: undefined
    //     });
    //   } else {
    //     message.error(formatMessage({ id: 'messages.edit.school.error' }));
    //   }
    // },
    
  },
  reducers: {
    setSchool(state, action) {
      return {
        ...state,
        school: action.payload,
      };
    },
    // setCompanies(state, action) {
    //   return {
    //     ...state,
    //     companies: action.payload,
    //   };
    // },
  },
};

export default Model;
