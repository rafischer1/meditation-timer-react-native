import React from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import { MontserratText } from './StyledText';

class SessionForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      notes: '',
      hr: 0,
      min: 0
    };
  }

  handleSubmit = (notes, hr, min) => {
    let postTime = 0;
    if (+hr === 0) {
      postTime = +min;
    } else {
      postTime = +hr * 60 + +min;
    }
    this.setState({
      notes: '',
      hr: 0,
      min: 0
    });
    return this.props.submitSessionCallback(postTime, notes);
  };

  render() {
    return (
      <View style={styles.form}>
        <MontserratText
          style={{
            fontSize: 20,
            borderBottomWidth: '2px',
            borderColor: 'black',
            borderRadius: 5,
            marginBottom: '1%'
          }}
        >
          Log a session:
        </MontserratText>
        <MontserratText>Duration (hr)</MontserratText>
        <TextInput
          keyboardType='numeric'
          style={{ height: 40, borderColor: '#229E84', borderWidth: 1 }}
          onChangeText={hr => this.setState({ hr })}
          value={this.state.hr}
        />
        <MontserratText>Duration (mins)</MontserratText>
        <TextInput
          keyboardType='numeric'
          style={{ height: 40, borderColor: '#27229E', borderWidth: 1 }}
          onChangeText={min => this.setState({ min })}
          value={this.state.min}
        />
        <MontserratText>Session Notes</MontserratText>
        <TextInput
          style={{ height: 40, borderColor: '#229E84', borderWidth: 1 }}
          onChangeText={notes => this.setState({ notes })}
          value={this.state.notes}
        />
        <Button
          title='Submit Session'
          onPress={() =>
            this.handleSubmit(this.state.notes, this.state.hr, this.state.min)
          }
        />
      </View>
    );
  }
}

// -=-Stylesheet Definition-=-
const styles = StyleSheet.create({
  form: {
    display: 'flex',
    alignContent: 'center',
    marginTop: '5%',
    borderTopWidth: '2px',
    borderBottomWidth: '2px',
    borderColor: 'black',
    borderRadius: '3px',
    padding: '1%'
  }
});

export default SessionForm;
