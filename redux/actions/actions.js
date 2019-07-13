export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILED = 'USER_FAILED';

export const getUser = id => {
  return async dispatch => {
    try {
      let response = await fetch(
        `https://b6wl1cs9ia.execute-api.us-east-1.amazonaws.com/staging/users/${id}`
      );
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
