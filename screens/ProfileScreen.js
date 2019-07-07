import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import { MonoText } from '../components/StyledText';
import { LinearGradient } from 'expo';
import { getUser } from '../store/store';
const faker = require('faker');

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      signedIn: false,
      name: faker.name.firstName(),
      photo: '',
      id: 0,
      username: '',
      photoUrl: faker.image.cats(),
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
      total += session.duration;
      console.log('session total:', total);
      return total;
    });
    return this.setState({
      sessions,
      signedIn: true,
      total
    });
  };

  /**
   * This is faulty: it seems like if the user is already logged in or if you navigate
   * from the profile page itself the signIn: false remains and nothing is passed as params
   * from the login...
   */
  componentDidMount() {
    this.updateUser();
    this.loadSessions(1);
    console.log('profile:', this.props.navigation.state.params);
  }

  updateUser = () => {
    let user = getUser();
    console.log('user in profile:', user);
    if (user.id !== 0) {
      this.setState({
        signedIn: true,
        id: user.id,
        name: user.name,
        photoUrl: user.photoUrl
      });
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={['#F7FFFB', 'white']}
          style={{
            padding: 0,
            alignItems: 'center',
            borderRadius: 4
          }}
        >
          <MonoText style={styles.altText}>
            {this.state.name}'s Profile 🌺
          </MonoText>

          <View style={styles.shadow}>
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius: 5
              }}
              source={{ uri: this.state.photoUrl }}
            />
          </View>
          <Button
            onPress={() => this.fetchSession(1)}
            title='Get Sessions for user'
            color='#27229E'
            accessibilityLabel='Log the session to your profile'
          />
          <Text style={styles.altText}>
            Total time in meditation: {this.state.total} min
          </Text>
        </LinearGradient>
        {this.state.sessions.map(session => {
          return (
            <View style={styles.sessionDiv}>
              <Text style={styles.sessions}>
                Session date: {FormatDate(session.created_at)}
              </Text>
              <Text style={styles.sessions}>
                Session duration: {session.duration} min
              </Text>
            </View>
          );
        })}
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
  sessionDiv: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    margin: 4,
    borderColor: '#27229E'
  },
  sessions: {
    fontSize: 14,
    color: '#229E84',
    margin: 4
  },
  altText: {
    fontSize: 24,
    margin: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#27229E'
  },
  shadow: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'grey',
    shadowOpacity: 1.0
  }
});

// componentDidMount() {
//   console.log('GET USER IN PROFILE:', getUser());
//   if (this.props.navigation.state.params === undefined) {
//     console.log('profile:', this.props.navigation.state.params);
//     this.setState({
//       signedIn: false
//     });
//   } else if (this.props.navigation.state.params !== undefined) {
//     console.log('profile 2:', this.props.navigation.state.params);
//     this.setState({
//       signedIn: true,
//       id: this.props.navigation.state.params.user.id,
//       name: this.props.navigation.state.params.user.givenName,
//       photoUrl: this.props.navigation.state.params.user.photoUrl
//     });
//     this.loadSessions(this.props.navigation.state.params.user.id);
//   }
// }
