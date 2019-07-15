export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILED = 'USER_FAILED';

export const getUser = id => {
  return async dispatch => {
    try {
      let response = await fetch(
        `https://b6wl1cs9ia.execute-api.us-east-1.amazonaws.com/staging/users/${id}`
      );
      let googleUser = await response.json();
      let user = {};
      if (response) {
        let response = await fetch(
          `https://med-timer.herokuapp.com/chat/${
            googleUser.email.split('@')[0]
          }`,
          {
            method: 'POST'
          }
        );
        let resJSON = await response.json();
        user = { googleUser, token: resJSON.token };
      }
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

const fetchToken = async () => {
  return resJSON.token;
};
