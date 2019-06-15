import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View } from "react-native";
import { MonoText } from "../components/StyledText";
import store from "../store/store";

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: true,
      name: "Artie",
      photoUrl: "",
      userId: "1",
      userName: "",
      photoUrl: "",
      givenName: "",
      sessions: [],
      total: 0
    };
  }

  loadProfile = () => {
    console.log("load profile:", store.getName(), store.getAuthId());
    this.setState({
      name: store.getName(),
      userId: store.getAuthId(),
      signedIn: true
    });
  };

  loadSessions = () => {
    return this.state.signedIn === false
      ? null
      : this.fetchSession(this.state.userId);
  };

  fetchSession = async id => {
    let response = await fetch(`http://localhost:3000/sessions/${id}`);
    let sessions = await response.json();
    console.log("profile mount:", sessions);
    let total = 0;
    sessions.map(session => {
      console.log("session:", session.duration);
      return (total += session.duration);
    });
    return this.setState({
      sessions,
      signedIn: true,
      total
    });
  };

  componentDidMount() {
    // this.loadProfile();
    this.loadSessions();
  }

  render() {
    return this.state.signedIn === false ? (
      <ScrollView>
        <MonoText>SIGN IN TO SEE YOUR PROFILE</MonoText>
      </ScrollView>
    ) : (
      <ScrollView>
        <MonoText>{this.state.name}'s Profile</MonoText>
        <View>
          {this.state.sessions.map(session => {
            return (
              <View>
                <Text>Session date: {FormatDate(session.created_at)}</Text>
                <Text>Session duration: {session.duration}</Text>
              </View>
            );
          })}
        </View>
        <Text>Total time sitting: {this.state.total}</Text>
      </ScrollView>
    );
  }
}

ProfileScreen.navigationOptions = {
  title: "Profile"
};

// FormatDate returns a US style date `day/month/year` from a timestamp
const FormatDate = createdAt => {
  //2019-06-15T19:20:40.421Z
  let date = "";
  date = `${createdAt.split("T")[0].split("-")[1]}/${
    createdAt
      .split(":")[0]
      .split("-")[2]
      .split("T")[0]
  }/${createdAt.split(":")[0].split("-")[0]}`;
  console.log(date);
  return date;
};
