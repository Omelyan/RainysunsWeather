/**
 * Sample React Native Weather App
 * Dmytro Omelyan (dima.omelyan@gmail.com)
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MapScreen, WeatherScreen } from './screens';

import { theme } from './assets/options';

const tabBarOptions = {
  keyboardHidesTabBar: true,
  adaptive: false,

  tabStyle: {
    alignSelf: 'center',
  },

  labelStyle: {
    fontSize: theme.layout.fontSize.smaller,
    padding: theme.layout.padding.narrow,
  },

  activeTintColor: theme.colors.text.accent1,
  inactiveTintColor: theme.colors.text.dimmed,
};

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Map" tabBarOptions={tabBarOptions}>
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Weather forecast" component={WeatherScreen} initialParams={{}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
