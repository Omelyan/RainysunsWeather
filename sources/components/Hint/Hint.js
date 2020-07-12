import React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
} from 'react-native';

import { animationOptions, theme } from '../../assets/options';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: theme.layout.margin.double,
    paddingHorizontal: theme.layout.padding.default,
    paddingVertical: theme.layout.padding.narrow,
    backgroundColor: theme.colors.secondary.default,
    borderRadius: theme.layout.borderRadius,
  },

  text: {
    fontSize: theme.layout.fontSize.default,
    color: theme.colors.secondary.text.default,
  },
});

export default class Hint extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      animatedOpacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.fade(
      {
        toValue: 1,
        duration: animationOptions.duration.long,
        delay: 1000,
      },
      () => this.fade({
        toValue: 0,
        duration: animationOptions.duration.default,
        delay: 5000,
      }),
    );
  }

  fade = (params, callback) => {
    const { animatedOpacity } = this.state;

    Animated.timing(animatedOpacity, {
      ...params,
      useNativeDriver: true,
    }).start(callback);
  };

  render() {
    const { text } = this.props;
    const { animatedOpacity } = this.state;

    return (
      <Animated.View
        style={[styles.container, { opacity: animatedOpacity }]}
      >
        <Text style={styles.text} numberOfLines={1}>{text}</Text>
      </Animated.View>
    );
  }
}
