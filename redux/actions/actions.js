export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILED = 'USER_FAILED';
export const SESSIONS_SUCCESS = 'SESSIONS_SUCCESS';
export const SESSIONS_FAILED = 'SESSIONS_FAILED';

export const getSessions = id => {
  return async dispatch => {
    try {
      let response = await fetch(`http://localhost:3000/sessions/${id}}`);
      let sessions = await response.json();
      dispatch({
        type: SESSIONS_SUCCESS,
        payload: sessions
      });
    } catch (err) {
      dispatch({
        type: SESSIONS_FAILED,
        payload: err
      });
    }
  };
};

export const getUser = id => {
  return async dispatch => {
    try {
      let response = await fetch(`http://localhost:3000/users/${id}`);
      let user = await response.json();
      dispatch({
        type: USER_SUCCESS,
        payload: user
      });
    } catch (err) {
      dispatch({
        type: USER_FAILED,
        payload: err
      });
    }
  };
};
