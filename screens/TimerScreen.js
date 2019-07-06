import React from 'react';
import { ScrollView, StyleSheet, Button, View } from 'react-native';
import CountDown from 'react-native-countdown-component';
import NumericInput from 'react-native-numeric-input';
import { MonoText } from '../components/StyledText';

export default class TimerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 0, timerValue: 10, running: false };
  }

  _startButton(value) {
    return this.setState({ timerValue: value, value: 0, running: true });
  }

  _stopButton() {
    return this.setState({ running: false });
  }

  _finishedCall(msg) {
    console.log(`${msg}: ring the alarm!`);
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
          timeLabelStyle={{ color: 'white', fontWeight: 'bold' }}
          timeToShow={['H', 'M', 'S']}
          timeLabels={{ h: 'hr', m: 'min', s: 'sec' }}
          showSeparator
          running={this.state.running}
        />
        <View style={styles.input}>
          <NumericInput
            value={this.state.value}
            onChange={value => this.setState({ value })}
            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
            totalWidth={250}
            totalHeight={60}
            iconSize={30}
            step={5}
            valueType='integer'
            rounded
            textColor='white'
            iconStyle={{ color: 'white' }}
            rightButtonBackgroundColor='#229E84'
            leftButtonBackgroundColor='#27229E'
          />
        </View>
        <View style={styles.button}>
          <Button
            style={styles.button}
            onPress={() => this._startButton(this.state.value)}
            title='Start'
            color='#27229E'
            accessibilityLabel='Start the meditation timer'
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => this._stopButton()}
            title='Stop'
            color='#27229E'
            accessibilityLabel='Stop the meditation timer'
          />
        </View>
      </ScrollView>
    );
  }
}

TimerScreen.navigationOptions = {
  title: '⏳ Meditation Timer ⏲'
};

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
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#84229E',
    backgroundOpacity: 2
  }
});

// http POST https://b6wl1cs9ia.execute-api.us-east-1.amazonaws.com/staging/sessions/1 duration=20 id here is the authId
