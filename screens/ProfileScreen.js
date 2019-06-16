import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, View, StyleSheet } from 'react-native';
import { MonoText } from '../components/StyledText';
import { LinearGradient } from 'expo';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: true,
      name: 'Artie',
      photoUrl: '',
      userId: '1',
      userName: '',
      photoUrl: '',
      givenName: '',
      sessions: [],
      total: 0
    };
  }

  loadProfile = () => {
    console.log('load profile:', this.props.navigation);
  };

  loadSessions = () => {
    return this.state.signedIn === false
      ? null
      : this.fetchSession(this.state.userId);
  };

  fetchSession = async id => {
    let response = await fetch(`http://localhost:3000/sessions/${id}`);
    let sessions = await response.json();
    console.log('profile mount:', sessions);
    let total = 0;
    sessions.map(session => {
      console.log('session:', session.duration);
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
        <MonoText style={styles.altText}>SIGN IN TO SEE YOUR PROFILE</MonoText>
      </ScrollView>
    ) : (
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={['#229E84', 'white', 'white']}
          style={{ padding: 0, alignItems: 'center', borderRadius: 4 }}
        >
          <MonoText style={styles.altText}>
            {this.state.name}'s Profile 🌺
          </MonoText>
          <View>
            {this.state.sessions.map(session => {
              return (
                <View>
                  <Text style={styles.sessions}>
                    Session date: {FormatDate(session.created_at)}
                  </Text>
                  <Text style={styles.sessions}>
                    Session duration: {session.duration}
                  </Text>
                </View>
              );
            })}
          </View>
          <Text style={styles.altText}>
            Total time in meditation: {this.state.total}
          </Text>
        </LinearGradient>
      </ScrollView>
    );
  }
}

ProfileScreen.navigationOptions = {
  title: 'Profile'
};

// FormatDate returns a US style date `day/month/year` from a timestamp
const FormatDate = createdAt => {
  //2019-06-15T19:20:40.421Z
  let date = '';
  date = `${createdAt.split('T')[0].split('-')[1]}/${
    createdAt
      .split(':')[0]
      .split('-')[2]
      .split('T')[0]
  }/${createdAt.split(':')[0].split('-')[0]}`;
  console.log(date);
  return date;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'white',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30
  },
  sessions: { fontSize: 20, color: '#27229E', margin: 5 },
  altText: {
    fontSize: 24,
    margin: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#27229E'
  }
});
