import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { Google } from "expo";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { signedIn: false, name: "", photoUrl: "" };
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
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
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
      <Text style={styles.header}>Sign In With Google</Text>
      <Button
        title="Sign in with Google"
        style={styles.button}
        onPress={() => props.signIn()}
      />
    </View>
  );
};

const LoggedInPage = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome:{props.name}</Text>
      <Image style={styles.image} source={{ uri: props.photoUrl }} />
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
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  },
  button: {}
});
