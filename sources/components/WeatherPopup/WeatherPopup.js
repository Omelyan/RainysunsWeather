import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { theme } from '../../assets/options';

const styles = StyleSheet.create({
  blobContainer: {
    flexDirection: 'row',
    marginBottom: theme.layout.margin.narrow,
    padding: theme.layout.padding.default,
    borderRadius: theme.layout.borderRadius,
    backgroundColor: theme.colors.secondary.default,
    borderWidth: 1,
    borderColor: 'white',
  },

  titleContainer: {
    maxWidth: 120,
    marginRight: theme.layout.margin.narrow,
  },

  temperatureContainer: {
  },

  normalText: {
    fontSize: theme.layout.fontSize.default,
    color: theme.colors.secondary.text.default,
  },

  smallerText: {
    fontSize: theme.layout.fontSize.smaller,
    color: theme.colors.secondary.text.dimmed,
  },

  largeText: {
    fontSize: theme.layout.fontSize.large,
    color: theme.colors.secondary.text.default,
  },
});

export default class WeatherPopup extends React.PureComponent {
  render() {
    const {
      title,
      mood,
      value,
    } = this.props;

    return (
      <View style={styles.blobContainer}>

        {/* title */}
        <View style={styles.titleContainer}>
          <Text style={styles.normalText} numberOfLines={1}>{title}</Text>
          <Text style={styles.smallerText} numberOfLines={2}>{mood}</Text>
        </View>

        {/* temperature */}
        <View style={styles.temperatureContainer}>
          <Text style={styles.largeText}>
            {`${value >= 0 ? '+' : '-'}${value}°C`}
          </Text>
        </View>

      </View>
    );
  }
}
