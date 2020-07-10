import React from 'react';
import {
  View,
  Text,
} from 'react-native';

export default class WeatherScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>Weather screen.</Text>
      </View>
    );
  }
}
