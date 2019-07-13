import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';
import { Provider } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import store from './redux/store';
import AppNavigator from './navigation/AppNavigator';

export default (App = props => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <View>
        <ActivityIndicator size='large' color='#00ffff' />
        <AppLoading
          startAsync={loadResourcesAsync}
          onFinish={() => handleFinishLoading(setLoadingComplete)}
        />
      </View>
    );
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
          <AppNavigator />
        </View>
      </Provider>
    );
  }
});

const loadResourcesAsync = async () => {
  await Promise.all([
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      montserrat: require('./assets/fonts/Montserrat-Regular.ttf')
    })
  ]);
};

const handleFinishLoading = setLoadingComplete => setLoadingComplete(true);

// -=-Stylesheet Definition-=-
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
