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

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Map">
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Weather forecast" component={WeatherScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
