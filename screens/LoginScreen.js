import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView
} from "react-native";
import store from "../store/store";
import { Google } from "expo";
import { MonoText } from "../components/StyledText";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      name: "",
      photoUrl: "",
      userId: "",
      userName: "",
      photoUrl: "",
      givenName: ""
    };
  }

  signIn = async () => {
    console.log("hit the sign in button");
    try {
      const result = await Google.logInAsync({
        iosClientId:
          "1073974143957-sgfhvimga2at7e0pvvko6vgnimcmj0k8.apps.googleusercontent.com",
        iosStandaloneAppClientId:
          "1073974143957-sgfhvimga2at7e0pvvko6vgnimcmj0k8.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });
      console.log("result returned:", result);
      if (result.type === "success") {
        console.log("result before state set:", result);
        loginCallback(result.user.givenName, result.user.id);
        return this.setState({
          signedIn: true,
          userId: result.user.id,
          name: result.user.name,
          photoUrl: result.user.photoUrl,
          givenName: result.user.givenName
        });
      } else {
        console.log("cancelled");
      }
    } catch (err) {
      console.log("sign in error", err);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
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
        title="Sign In"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25,
    padding: 10
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  },
  info: {
    textAlign: "center",
    fontSize: 20,
    borderWidth: 3,
    width: 200,
    height: 200,
    padding: 10,
    borderColor: "#84229E",
    borderRadius: 10
  }
});

const loginCallback = async (name, id) => {
  console.log("logincallback called");
  let postBody = {
    username: name,
    id
  };
  let response = await fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify(postBody),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (response.status === 201) {
    let user = await response.json();
    store.setAuthId(+user.authId);
    store.setName(user.userName);
    return;
  } else {
    let newUser = await response.json();
    store.setAuthId(+newUser.authId);
    store.setName(newUser.userName);
    return;
  }

  return null;
};
