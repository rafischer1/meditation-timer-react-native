import React from "react";
import { ScrollView, StyleSheet, Button, View } from "react-native";
import CountDown from "react-native-countdown-component";
import NumericInput from "react-native-numeric-input";

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

  render() {
    return (
      <ScrollView style={styles.container}>
        <CountDown
          size={30}
          until={this.state.timerValue * 60}
          onFinish={() => console.log("🔔")}
          digitStyle={{
            backgroundColor: "#FFF",
            borderWidth: 2,
            borderColor: "#1CC625"
          }}
          digitTxtStyle={{ color: "#1CC625" }}
          timeLabelStyle={{ color: "teal", fontWeight: "bold" }}
          separatorStyle={{ color: "teal" }}
          timeToShow={["M", "S"]}
          timeLabels={{ m: "min", s: "sec" }}
          showSeparator
          running={this.state.running}
        />
        <View style={styles.input}>
          <NumericInput
            value={this.state.value}
            onChange={value => this.setState({ value })}
            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
            totalWidth={220}
            totalHeight={50}
            iconSize={25}
            step={5}
            valueType="integer"
            rounded
            textColor="teal"
            iconStyle={{ color: "white" }}
            rightButtonBackgroundColor="#EA3788"
            leftButtonBackgroundColor="#E56B70"
          />
        </View>
        <View style={styles.button}>
          <Button
            style={styles.button}
            onPress={() => this._startButton(this.state.value)}
            title="Start"
            color="black"
            accessibilityLabel="Start the meditation timer"
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => this._stopButton()}
            title="Stop"
            color="black"
            accessibilityLabel="Stop the meditation timer"
          />
        </View>
      </ScrollView>
    );
  }
}

TimerScreen.navigationOptions = {
  title: "⏳ Meditation Timer ⏲"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    backgroundColor: "#000"
  },
  input: {
    paddingLeft: 55,
    margin: 20
  },
  button: {
    width: "75%",
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    marginLeft: "12.5%",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
  }
});
