export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILED = 'USER_FAILED';

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
