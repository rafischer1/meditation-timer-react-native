import sessionsReducer from './SessionsReducer';
import userReducer from './UserReducer';
import { combineReducers } from 'redux';

export default combineReducers({ sessionsReducer, userReducer });
