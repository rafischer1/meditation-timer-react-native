import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import TimerScreen from '../screens/TimerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';

const LoginStack = createStackNavigator({
  Login: LoginScreen
});

LoginStack.navigationOptions = {
  tabBarLabel: 'Login',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      color='#84229E'
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-flower' : 'md-flower'}
    />
  )
};

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      color='#84229E'
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-rose' : 'md-rose'}
    />
  )
};

const TimerStack = createStackNavigator({
  Link: TimerScreen
});

TimerStack.navigationOptions = {
  tabBarLabel: 'Timer',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      color='#229E84'
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-alarm' : 'md-alarm'}
    />
  )
};

const ChatStack = createStackNavigator({
  Chat: ChatScreen
});

ChatStack.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      color='#27229E'
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-bonfire' : 'md-bonfire'}
    />
  )
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      color='#27229E'
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-planet' : 'md-planet'}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  TimerStack,
  ChatStack,
  ProfileStack,
  LoginStack
});
