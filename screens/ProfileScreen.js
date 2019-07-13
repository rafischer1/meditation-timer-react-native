import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View, StyleSheet, Image, Button } from 'react-native';
import { ListItem } from 'react-native-elements';
import { MontserratText } from '../components/StyledText';
import { connect } from 'react-redux';
import TouchableScale from 'react-native-touchable-scale';
import Swipeout from 'react-native-swipeout';
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
      total: 0,
      toDelete: 0
    };
  }

  fetchSessions = async () => {
    let response = await fetch(
      `https://b6wl1cs9ia.execute-api.us-east-1.amazonaws.com/staging/sessions/${
        this.props.user.authid
      }`
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

  deleteSession = async id => {
    let response = await fetch(
      `https://b6wl1cs9ia.execute-api.us-east-1.amazonaws.com/staging/sessions/${id}`,
      {
        method: 'DELETE'
      }
    );
    let deleted = await response.json();
    console.log('deleted sessions:', deleted);
    return this.fetchSessions();
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

  swipeBtns = [
    {
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => {
        console.log('to delete:', this.state.toDelete);
        this.deleteSession(this.state.toDelete);
        return this.fetchSessions();
      }
    }
  ];

  render() {
    return (
      <ScrollView style={styles.container}>
        {!this.props.user ? (
          <MontserratText style={(styles.altText, styles.loginMsg)}>
            Login in to see profile
          </MontserratText>
        ) : (
          <View>
            <View style={styles.shadow}>
              <Image
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 5
                }}
                source={{ uri: this.props.user.photo }}
              />
            </View>
            <View style={styles.button}>
              <Button
                onPress={() => this.fetchSessions()}
                title={`See ${this.props.user.username}'s Sessions`}
                color='white'
                accessibilityLabel='Log the session to your profile'
              />
            </View>
            <MontserratText style={styles.altText}>
              Sessions Total: {this.state.total} min
            </MontserratText>
          </View>
        )}

        {this.state.sessions.map((session, i) => {
          return (
            <View style={styles.sessionDiv}>
              <Swipeout
                right={this.swipeBtns}
                autoClose='true'
                backgroundColor='transparent'
              >
                <ListItem
                  Component={TouchableScale}
                  friction={90} //
                  tension={100} // These props are passed to the parent component (here TouchableScale)
                  activeScale={0.95} //
                  onPress={() => this.setState({ toDelete: session.id })}
                  linearGradientProps={{
                    colors: ['#229E84', '#27229E'],
                    start: [1, 0],
                    end: [0.2, 0]
                  }}
                  // Only if no expo
                  leftAvatar={{
                    rounded: true,
                    source: { uri: this.props.user.photo }
                  }}
                  title='Date'
                  titleStyle={{ color: 'white', fontWeight: 'bold' }}
                  subtitleStyle={{ color: 'white' }}
                  subtitle={`${FormatDate(session.created_at)} Duration: ${
                    session.duration
                  } min`}
                  checkmarkColor='white'
                  checkmark
                />
                <ListItem
                  key={i}
                  title={'Notes'}
                  onPress={() => this.setState({ toDelete: session.id })}
                  subtitle={session.notes}
                />
              </Swipeout>
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

ProfileScreen.navigationOptions = { title: 'Profile' };

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

// -=-Stylesheet Definition-=-
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40
  },
  loggedIn: {
    alignItems: 'center'
  },
  loginMsg: {
    paddingTop: 20,
    marginTop: 90,
    fontSize: 24
  },
  sessionDiv: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    margin: 1,
    borderColor: '#27229E'
  },
  sessions: {
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 14,
    color: '#229E84'
  },
  altText: {
    fontSize: 22,
    margin: 75,
    color: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#27229E'
  },
  shadow: {
    alignItems: 'center',
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'grey',
    shadowOpacity: 1.0
  },
  button: {
    width: '66%',
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: '16.5%',
    textAlign: 'center',
    backgroundColor: 'teal',
    borderRadius: 5,
    backgroundOpacity: 2
  }
});
