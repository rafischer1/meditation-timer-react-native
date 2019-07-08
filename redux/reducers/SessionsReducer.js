import { SESSIONS_FAILED, SESSIONS_SUCCESS } from '../actions/actions';

const initialState = [];

const sessionsReducer = (state = initialState, { type, payload }) => {
  console.log('sessions reducer payload:', type, payload);
  switch (type) {
    case SESSIONS_SUCCESS:
      return [...initialState, payload];
    case SESSIONS_FAILED:
      return payload;
    default:
      return state;
  }
};

export default sessionsReducer;
