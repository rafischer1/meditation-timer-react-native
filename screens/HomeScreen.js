import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { MontserratText } from '../components/StyledText';

export default function HomeScreen() {
  return (
    <ImageBackground
      source={{
        uri:
          'https://images.unsplash.com/photo-1503891617560-5b8c2e28cbf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80'
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      />
      <MontserratText style={styles.bottom}>
        Welcome to the Meditation Timer - Login to see personal progress and
        navigate to the timer tab to begin an anonymous session
      </MontserratText>
    </ImageBackground>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

// -=-Stylesheet Definition-=-
const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18
  },
  bottom: {
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 16,
    flex: 'flex-end',
    color: 'white'
  }
});
