import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView
} from 'react-native';

import { Google } from 'expo';
import { MonoText } from '../components/StyledText';
import { setUser } from '../store/store';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        this.loginCallback(
          result.user.givenName,
          result.user.id,
          result.user.photoUrl
        );
        const updatedUser = {
          id: result.user.id,
          name: result.user.givenName,
          photoUrl: result.user.photoUrl
        };
        setUser(updatedUser);
        this.updateProfile(result.user);
        return this.setState({
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
      console.log('sign in error', err);
    }
  };

  loginCallback = async (name, id, photo) => {
    let postBody = {
      username: name,
      authid: id,
      photo
    };
    let response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 201) {
      let user = await response.json();
      console.log('user:', user);
    } else {
      let newUser = await response.json();
      console.log('new user:', newUser);
    }
    return null;
  };

  updateProfile(user) {
    console.log('updateProfile Called');
    this.props.navigation.navigate('Profile', {
      user: user
    });
  }

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
      <MonoText style={styles.header}>Sign In With Google</MonoText>
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
      <MonoText style={styles.header}>Welcome: {props.name}</MonoText>
      <Image style={styles.image} source={{ uri: props.photoUrl }} />
      <View style={styles.info}>
        <MonoText>Profile: see your stats!</MonoText>
        <MonoText>Timer: start a session!</MonoText>
        <MonoText>Home: learn about Meditation Timer!</MonoText>
      </View>
    </View>
  );
};

const profile = {
  id: 1,
  name: 'testname',
  photo: '12312312',
  loggedin: true
};

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
