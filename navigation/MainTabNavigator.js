import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import TimerScreen from "../screens/TimerScreen";
import ProfileScreen from "../screens/ProfileScreen";

const LoginStack = createStackNavigator({
  Login: LoginScreen,
  props: ProfileScreen
});

LoginStack.navigationOptions = {
  tabBarLabel: "Login",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      color="#84229E"
      focused={focused}
      name={Platform.OS === "ios" ? "ios-bulb" : "md-bulb"}
    />
  )
};

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      color="#84229E"
      focused={focused}
      name={Platform.OS === "ios" ? "ios-rose" : "md-rose"}
    />
  )
};

const TimerStack = createStackNavigator({
  Link: TimerScreen
});

TimerStack.navigationOptions = {
  tabBarLabel: "Timer",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      color="#229E84"
      focused={focused}
      name={Platform.OS === "ios" ? "ios-alarm" : "md-alarm"}
    />
  )
};

const ProfileStack = createStackNavigator({
  Settings: ProfileScreen,
  props: LoginScreen
});

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      color="#27229E"
      focused={focused}
      name={Platform.OS === "ios" ? "ios-planet" : "md-planet"}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  TimerStack,
  ProfileStack,
  LoginStack
});
