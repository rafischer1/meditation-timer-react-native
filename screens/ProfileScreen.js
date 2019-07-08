import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import { MonoText } from '../components/StyledText';
import { connect } from 'react-redux';
const faker = require('faker');

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
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

  fetchSession = async () => {
    let response = await fetch(
      `http://localhost:3000/sessions/${this.props.user.authid}`
    );
    let sessions = await response.json();
    if (sessions.length === 0) {
      alert('Log a session first!');
    }
    let total = 0;
    sessions.map(session => {
      total += session.duration;
      return total;
    });
    return this.setState({
      sessions,
      signedIn: true,
      total
    });
  };

  componentDidMount() {
    if (!this.props.user) {
      return null;
    } else {
      console.log('component mount props:', this.props.user);
      this.setState({
        user: this.props.user,
        signedIn: true
      });
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {!this.props.user ? (
          <MonoText style={styles.altText}>Login in to see profile</MonoText>
        ) : (
          <ScrollView style={styles.container}>
            <MonoText style={styles.altText}>
              {this.props.user.username}'s Profile 🌺
            </MonoText>
            <View style={styles.shadow}>
              <Image
                style={{
                  width: 80,
                  alignItems: 'center',
                  height: 80,
                  borderRadius: 5
                }}
                source={{ uri: this.props.user.photo }}
              />
            </View>
            <Button
              onPress={() => this.fetchSession(this.props.user.authid)}
              title='Get Sessions for user'
              color='#27229E'
              accessibilityLabel='Log the session to your profile'
            />
            <Text style={styles.altText}>
              Total time in meditation: {this.state.total} min
            </Text>
          </ScrollView>
        )}

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

function mapStateToProps(state) {
  const user = state;
  return { user: user.userReducer[0] };
}

export default connect(mapStateToProps)(ProfileScreen);

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
    alignItems: 'center',
    backgroundColor: 'white',
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
    alignItems: 'center',
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
