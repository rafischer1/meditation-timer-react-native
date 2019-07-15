import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {
  View,
  StyleSheet,
  Image,
  Button,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { FormatDate, FormatHour } from '../assets/conversionFuncs';
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
        this.props.user.googleUser.authid
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
    if (response.status === 200) {
      return this.fetchSessions();
    } else {
      alert('Session delete error');
    }
  };

  componentDidMount() {
    if (!this.props.user) {
      return null;
    } else {
      this.setState({
        user: this.props.user.googleUser,
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
        this.deleteSession(this.state.toDelete);
        return this.fetchSessions();
      }
    }
  ];

  render() {
    return (
      <ScrollView style={styles.container}>
        {!this.props.user ? (
          <ScrollView>
            <View style={styles.shadow}>
              <Image
                style={{
                  width: 250,
                  height: 400,
                  borderRadius: 5,
                  marginTop: 40
                }}
                source={{
                  uri:
                    'https://images.unsplash.com/photo-1507400492013-162706c8c05e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=909&q=80'
                }}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
            <MontserratText style={{ fontSize: 30, paddingTop: 5 }}>
              Login in to see profile
            </MontserratText>
          </ScrollView>
        ) : (
          <View>
            <View style={styles.shadow}>
              <Image
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 5
                }}
                source={{ uri: this.props.user.googleUser.photo }}
              />
            </View>
            <View style={styles.button}>
              <Button
                onPress={() => this.fetchSessions()}
                title={`See ${this.props.user.googleUser.username}'s Sessions`}
                color='white'
                accessibilityLabel='Log the session to your profile'
              />
            </View>
            {this.state.total < 59 ? (
              <MontserratText style={{ fontSize: 30 }}>
                Sessions Total: {this.state.total} min
              </MontserratText>
            ) : (
              <MontserratText style={{ fontSize: 30 }}>
                Sessions Total: {FormatHour(this.state.total)}
              </MontserratText>
            )}
          </View>
        )}
        {this.state.sessions.map(session => {
          return (
            <ScrollView style={styles.sessionDiv}>
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
                  onPress={() => this.setState({ toDelete: +session.id })}
                  linearGradientProps={{
                    colors: ['#229E84', '#27229E'],
                    start: [1, 0],
                    end: [0.2, 0]
                  }}
                  leftAvatar={{
                    rounded: true,
                    source: { uri: faker.image.nature() }
                  }}
                  title={`${FormatDate(session.created_at)} Duration: ${
                    session.duration
                  } min`}
                  titleStyle={{ color: 'white', fontWeight: 'bold' }}
                  subtitleStyle={{ color: 'white' }}
                  subtitle={`${session.notes}`}
                />
              </Swipeout>
            </ScrollView>
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

// -=-Stylesheet Definition-=-
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30
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
    width: Dimensions.get('window').width / 1.05,
    paddingBottom: 3,
    borderRadius: 5
  },
  sessions: {
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 14,
    color: '#229E84'
  },
  altText: {
    fontSize: 28,
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
    color: 'white',
    fontSize: 26,
    padding: 3,
    textAlign: 'center',
    backgroundColor: 'teal',
    borderRadius: 5,
    backgroundOpacity: 2,
    margin: 25
  }
});
