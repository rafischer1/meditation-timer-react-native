import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import { MonoText } from '../components/StyledText';
import { LinearGradient } from 'expo';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      signedIn: false,
      name: '',
      photo: '',
      id: '',
      username: '',
      photoUrl: '',
      givenName: '',
      sessions: [],
      total: 0
    };
  }

  loadSessions = id => {
    return this.state.signedIn === false ? null : this.fetchSession(id);
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
    if (this.props.navigation.state.params === undefined) {
      console.log('profile:', this.props.navigation.state.params);
      this.setState({
        signedIn: false
      });
    } else if (this.props.navigation.state.params !== undefined) {
      console.log('profile 2:', this.props.navigation.state.params);
      this.setState({
        signedIn: true,
        id: this.props.navigation.state.params.user.id,
        name: this.props.navigation.state.params.user.givenName,
        photoUrl: this.props.navigation.state.params.user.photoUrl
      });
      this.loadSessions(this.props.navigation.state.params.user.id);
    }
  }

  render() {
    return this.state.signedIn === false ? (
      <ScrollView>
        <MonoText style={styles.altText}>SIGN IN TO SEE YOUR PROFILE</MonoText>
        <Button
          title='Go to Sign In'
          onPress={() => {
            this.props.navigation.navigate('Login', {
              id: 0
            });
          }}
        />
      </ScrollView>
    ) : (
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={['#229E84', 'white', 'white']}
          style={{
            padding: 0,
            alignItems: 'center',
            borderRadius: 4
          }}
        >
          <MonoText style={styles.altText}>
            {this.state.name}'s Profile 🌺
          </MonoText>

          <View>
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: this.state.photoUrl }}
            />
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

export default ProfileScreen;

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
