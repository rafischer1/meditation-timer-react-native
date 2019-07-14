import { USER_FAILED, USER_SUCCESS } from '../actions/actions';

const initialState = [];

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_SUCCESS:
      return [...initialState, payload];
    case USER_FAILED:
      return payload;
    default:
      return state;
  }
};

export default userReducer;
