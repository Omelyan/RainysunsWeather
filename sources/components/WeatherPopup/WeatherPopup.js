import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 80,
    backgroundColor: 'orange',
  },
});

export default class WeatherPopup extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello.</Text>
      </View>
    );
  }
}
