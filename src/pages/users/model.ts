import { User } from './types';
import { UserService } from './service';

const service = new UserService();

export class UserState {
  list: User[] = [];
}

export default {
  namespace: 'users',

  state: new UserState(),

  effects: {
    *all({ payload }, { call, put }) {
      const response = yield call(service.all);
      yield put({
        type: 'users',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(service.create, payload);
      yield put({
        type: 'users',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *update({ payload }, { call, put }) {
      const response = yield call(service.update, payload);
      yield put({
        type: 'users',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(service.update, payload);
      yield put({
        type: 'users',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    users(state: UserState, action) {
      return {
        ...state,
        list: action.payload.filter(item => !item.deleted),
      };
    },
  },
};
