chatSignUpCallback = async (username, password) => {
  let reqBody = {
    username: username.split('@')[0],
    password
  };
  console.log('hit the callback:', reqBody);
  let response = await fetch(
    `https://8unneavsk4.execute-api.us-east-1.amazonaws.com/staging/users`,
    {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  if (response.status === 200) {
    let resJson = await response.json();
    let newUser = {
      token: resJson.token,
      username: reqBody.username.split('@')[0]
    };
    return newUser;
  }
  if (response.status === 409) {
    let user = await loginCallback(reqBody);
    console.log('user in callback:', user);
    return user;
    // alert('🚨: Username already exists in database!');
  }
};

loginCallback = async reqBody => {
  let response = await fetch(
    `https://8unneavsk4.execute-api.us-east-1.amazonaws.com/staging/login`,
    {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  if (response.status === 403) {
    return alert(
      'ERROR 403 🚨: Username or password incorrect - please login again. Or sign up first!'
    );
  }
  let resJson = await response.json();
  if (response.status === 200) {
    let newUser = {
      token: resJson.token,
      username: reqBody.username
    };
    return newUser;
  } else {
    alert('ERROR 409 🚨: try logging in again...stream / stream');
  }
};

export default chatSignUpCallback;
