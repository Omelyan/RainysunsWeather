import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { dateToWeekDay } from '../../assets/utils';
import { theme } from '../../assets/options';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleContainer: {
    padding: theme.layout.padding.default,
    paddingTop: theme.layout.padding.double,
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    maxWidth: '67%',
    marginRight: theme.layout.margin.double,
  },

  caption: {
    flexShrink: 1,
  },

  itemContainer: {
    flexDirection: 'row',
    marginBottom: theme.layout.margin.default,
    paddingHorizontal: theme.layout.padding.default,
  },

  itemTitle: {
    flex: 3,
    flexShrink: 1,
  },

  itemTemperatures: {
    flex: 2,
    flexDirection: 'row',
  },

  normalText: {
    fontSize: theme.layout.fontSize.default,
    color: theme.colors.primary.text.default,
  },

  smallerText: {
    fontSize: theme.layout.fontSize.smaller,
    color: theme.colors.primary.text.dimmed,
  },

  largerText: {
    fontSize: theme.layout.fontSize.larger,
    color: theme.colors.primary.text.default,
  },

  largeText: {
    fontSize: theme.layout.fontSize.large,
    color: theme.colors.primary.text.accent1,
  },

  shade: {
    height: 20,
    marginBottom: -20,
    resizeMode: 'stretch',
    zIndex: 1,
  },
});

export default class ForecastView extends React.PureComponent {
  static ForecastItem({ item }) {
    const date = new Date(item['Date']);
    const weekDay = dateToWeekDay(date);
    const dayOfTheMonth = date.getDate();
    const {
      Temperature: {
        Minimum: { Value: minValue } = {},
        Maximum: { Value: maxValue } = {},
      } = {},
      Day: { IconPhrase: dayPhrase } = {},
    } = item;

    return (
      <TouchableOpacity onPress={() => null}>
        <View style={styles.itemContainer}>

          <View style={styles.itemTitle}>
            {/* title */}
            <Text style={styles.normalText} numberOfLines={1}>
              {`${weekDay}, ${dayOfTheMonth}`}
            </Text>
            {/* phrase */}
            <Text style={styles.smallerText} numberOfLines={2}>
              {dayPhrase}
            </Text>
          </View>

          <View style={styles.itemTemperatures}>
            {/* temperatures */}
            <Text style={styles.largeText} numberOfLines={1}>
              {`${maxValue.toFixed()}°`}
              <Text style={{ color: theme.colors.primary.text.light }}>/</Text>
              {`${minValue.toFixed()}°`}
            </Text>
          </View>

        </View>
      </TouchableOpacity>
    );
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      title,
      text,
      data,
    } = this.props;

    return (
      <View style={styles.container}>

        {/* title */}
        <View style={styles.titleContainer}>
          <Text style={[styles.largeText, styles.title]} numberOfLines={2}>{title}</Text>
          <Text style={[styles.smallerText, styles.caption]} numberOfLines={4}>{text}</Text>
        </View>

        {/* shade */}
        <Image
          style={styles.shade}
          blurRadius={0.8}
          source={{ uri: 'data:image/webp;base64,UklGRiYAAABXRUJQVlA4TBkAAAAvAMAEEA8w//M///Mf8BAIJOcPvkJE/wN0AA==' }}
        />

        {/* forecasts */}
        <FlatList
          data={data}
          keyExtractor={(item, index) => String(index)}
          renderItem={ForecastView.ForecastItem}
        />

      </View>
    );
  }
}
