import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Button,
  TouchableHighlight
} from 'react-native';
import { Google } from 'expo';
import { MontserratText } from '../components/StyledText';
import store from '../redux/store';
import { getUser, USER_SUCCESS } from '../redux/actions/actions';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

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
    let response = await fetch(
      'https://b6wl1cs9ia.execute-api.us-east-1.amazonaws.com/staging/users',
      {
        method: 'POST',
        body: JSON.stringify(postBody),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    if (response) {
      return this.updateProfile(result.user);
    } else {
      alert('Error on databse connection');
    }
  };

  logout = () => {
    return this.setState({ signedIn: false });
  };
  updateProfile = user => store.dispatch(getUser(user.id));

  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          <ScrollView style={{ paddingTop: 100 }}>
            <LoggedInPage name={this.state.name} photoUrl={this.state.photo} />
            <TouchableHighlight style={styles.button}>
              <Button
                onPress={() => this.logout()}
                title='Logout'
                style={styles.button}
                color='black'
                accessibilityLabel='Log the session to your profile'
              />
            </TouchableHighlight>
          </ScrollView>
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
      <View style={styles.shadow}>
        <Image
          style={{
            width: 250,
            height: 400,
            borderRadius: 5
          }}
          source={{
            uri:
              'https://images.unsplash.com/photo-1532918235359-7671f525386d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80'
          }}
        />
      </View>
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
  const logoutCallback = () => {
    console.log(props.logout);
    return props.logout();
  };
  return (
    <View style={styles.container}>
      <MontserratText style={styles.header}>
        Welcome: {props.name}
      </MontserratText>
      <View style={styles.shadow}>
        <Image style={styles.image} source={{ uri: props.photoUrl }} />
      </View>
      <View style={styles.info}>
        <MontserratText style={styles.font}>
          Profile: see your stats!
        </MontserratText>
        <MontserratText style={styles.font}>
          Timer: start a session!
        </MontserratText>
        <MontserratText style={styles.font}>
          Chat: engage with other practicioners!
        </MontserratText>
        <MontserratText style={styles.font}>
          Home: learn about Meditation Timer!
        </MontserratText>
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

// -=-Stylesheet Definition-=-
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
  shadow: {
    alignItems: 'center',
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'grey',
    shadowOpacity: 1.0
  },
  image: {
    marginTop: 15,
    marginBottom: 15,
    width: 100,
    height: 100,
    borderRadius: 5
  },
  info: {
    textAlign: 'center',
    fontSize: 26,
    borderWidth: 3,
    color: 'white',
    fontFamily: 'menlo',
    padding: 10,
    borderColor: 'white',
    borderRadius: 5
  },
  button: {
    width: 250,
    marginLeft: 50,
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    margin: 10,
    borderRadiu: 5
  },
  font: {
    fontSize: 20
  }
});
