import React from 'react';
import { ScrollView, StyleSheet, Button, View, TextInput } from 'react-native';
import CountDown from 'react-native-countdown-component';
import NumericInput from 'react-native-numeric-input';
import { MonoText } from '../components/StyledText';
import { connect } from 'react-redux';
import { Audio } from 'expo-av';
import { Input } from 'react-native-elements';

class TimerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      value: 0,
      timerValue: 0,
      running: false,
      id: 1,
      duration: 2,
      finished: false
    };
  }

  _playSound = async () => {
    soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('../assets/sounds/bell.mp3'));
      await soundObject.playAsync();
    } catch (err) {
      console.log('sound error:', err);
    }
  };

  _startButton(value) {
    return this.setState({
      timerValue: value,
      signedIn: false,
      value: 0,
      running: true,
      finished: false,
      user: {}
    });
  }

  _stopButton() {
    return this.setState({ running: false });
  }

  _finishedCall(msg) {
    this._playSound();
    return this.setState({ finished: true });
  }

  _postSession = async (id, duration, notes) => {
    let postBody = {
      duration,
      notes
    };
    let response = await fetch(
      `https://b6wl1cs9ia.execute-api.us-east-1.amazonaws.com/staging/sessions/${id}`,
      {
        method: 'POST',
        body: JSON.stringify(postBody),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.status === 200) {
      alert('Session logged!');
      return this.setState({ finished: false });
    } else {
      alert('Session was not able to be logged:', response.status);
      return this.setState({ finished: false, running: false, timerValue: 0 });
    }
  };

  _cancelSession = () => {
    return this.setState({
      finished: false,
      running: false,
      timerValue: 0
    });
  };

  componentDidMount() {
    this.setState({
      user: this.props.user,
      signedIn: true
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <MonoText>Select time in minutes and begin</MonoText>
        <CountDown
          size={30}
          until={this.state.timerValue * 60}
          onFinish={() => this._finishedCall('🔔')}
          digitStyle={{
            backgroundColor: '#FFF',
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 5
          }}
          digitTxtStyle={{ color: '#2546A4' }}
          timeLabelStyle={{
            color: 'white',
            fontWeight: 'bold'
          }}
          timeToShow={['H', 'M', 'S']}
          timeLabels={{
            h: 'hr',
            m: 'min',
            s: 'sec'
          }}
          showSeparator
          running={this.state.running}
        />
        <View style={styles.input}>
          <NumericInput
            value={this.state.value}
            onChange={value => this.setState({ value })}
            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
            totalWidth={250}
            totalHeight={75}
            iconSize={30}
            step={1}
            valueType='integer'
            rounded
            textColor='white'
            iconStyle={{ color: 'white' }}
            rightButtonBackgroundColor='#229E84'
            leftButtonBackgroundColor='#27229E'
          />
        </View>
        {!this.state.finished ? (
          <View>
            <View style={styles.buttonStart}>
              <Button
                onPress={() => this._startButton(this.state.value)}
                title='Start'
                color='white'
                accessibilityLabel='Start the meditation timer'
              />
            </View>
            <View style={styles.buttonStop}>
              <Button
                onPress={() => this._stopButton()}
                title='Stop'
                color='white'
                accessibilityLabel='Stop the meditation timer'
              />
            </View>
          </View>
        ) : (
          <ScrollView>
            <Input
              placeholder='Session Notes'
              containerStyle={{
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 5
              }}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              spellCheck={true}
            />
            <View style={styles.button}>
              <Button
                onPress={() => {
                  if (!this.props.user) {
                    alert('sign in to log sessions');
                  } else {
                    return this._postSession(
                      this.props.user.googleUser.authid,
                      this.state.timerValue,
                      this.state.text
                    );
                  }
                }}
                title='Log Session'
                color='white'
                accessibilityLabel='Log the session to your profile'
              />
            </View>
            <View style={styles.cancelButton}>
              <Button
                onPress={() => this._cancelSession()}
                title='Cancel Session'
                color='#229E84'
                accessibilityLabel='Log the session to your profile'
              />
            </View>
          </ScrollView>
        )}
      </ScrollView>
    );
  }
}

TimerScreen.navigationOptions = { title: 'Timer' };

function mapStateToProps(state) {
  const user = state;
  return { user: user.userReducer[0] };
}

export default connect(mapStateToProps)(TimerScreen);

// -=-Stylesheet Definition-=-
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    margin: 20
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#27229E',
    borderRadius: 5,
    backgroundOpacity: 2
  },
  shadow: {
    alignItems: 'center',
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'grey',
    shadowOpacity: 1.0
  },
  buttonStart: {
    backgroundColor: '#27229E',
    marginBottom: 10,
    padding: 5,
    borderRadius: 5
  },
  buttonStop: {
    backgroundColor: '#229E84',
    padding: 5,
    borderRadius: 5
  },
  cancelButton: {
    backgroundColor: 'black'
  }
});
