import React from 'react';
import { StyleSheet, View, Image, Button, ImageBackground } from 'react-native';
import { Google } from 'expo';
import { MontserratText } from '../components/StyledText';
import store from '../redux/store';
import { getUser, USER_SUCCESS } from '../redux/actions/actions';
import { connect } from 'react-redux';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      signedIn: false,
      name: '',
      photo: '',
      userId: '',
      userName: '',
      givenName: ''
    };
  }

  signIn = async () => {
    console.log('hit the sign in button');
    try {
      const result = await Google.logInAsync({
        iosClientId:
          '1073974143957-sgfhvimga2at7e0pvvko6vgnimcmj0k8.apps.googleusercontent.com',
        iosStandaloneAppClientId:
          '1073974143957-sgfhvimga2at7e0pvvko6vgnimcmj0k8.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });
      if (result.type === 'success') {
        this.loginCallback(result);
        return this.setState({
          user: result.user,
          signedIn: true,
          userId: result.user.id,
          name: result.user.name,
          photo: result.user.photoUrl,
          givenName: result.user.givenName
        });
      } else {
        console.log('cancelled');
      }
    } catch (err) {
      alert(`Error on sign in: ${err}`);
    }
  };

  loginCallback = async result => {
    let postBody = {
      username: result.user.givenName,
      authid: result.user.id,
      photo: result.user.photoUrl,
      email: result.user.email
    };
    console.log('logincall result body:', postBody);
    let response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response) {
      return this.updateProfile(result.user);
    } else {
      alert('Error on databse connection');
    }
  };

  updateProfile = user => store.dispatch(getUser(user.id));

  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          <LoggedInPage name={this.state.name} photoUrl={this.state.photo} />
        ) : (
          <LoginPage signIn={this.signIn} />
        )}
      </View>
    );
  }
}

const LoginPage = props => {
  return (
    <View>
      <MontserratText style={styles.header}>Sign In With Google</MontserratText>
      <Button
        title='Sign In'
        style={styles.button}
        onPress={() => props.signIn()}
      />
    </View>
  );
};

const LoggedInPage = props => {
  return (
    <View style={styles.container}>
      <MontserratText style={styles.header}>
        Welcome: {props.name}
      </MontserratText>
      <Image style={styles.image} source={{ uri: props.photoUrl }} />
      <View style={styles.info}>
        <MontserratText>Profile: see your stats!</MontserratText>
        <MontserratText>Timer: start a session!</MontserratText>
        <MontserratText>Home: learn about Meditation Timer!</MontserratText>
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: () => dispatch({ type: USER_SUCCESS })
  };
};

function mapStateToProps(state) {
  const user = state;
  return { user: user.userReducer[0] };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 25,
    padding: 10
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 3,
    borderRadius: 150
  },
  info: {
    textAlign: 'center',
    fontSize: 20,
    borderWidth: 3,
    width: 200,
    height: 200,
    padding: 10,
    borderColor: '#84229E',
    borderRadius: 10
  }
});
