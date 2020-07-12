import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { PlacesSearch, ForecastView } from '../../components';
import { getNearbyPlaceByGeopositionDummy as getNearbyPlaceByGeoposition, getWeekForecastsDummy as getWeekForecasts } from '../../services/weather';
import {
  theme,
  googleMapsAPIKey,
  language,
  predefinedPlaces,
} from '../../assets/options';

const statusBarHeight = StatusBar.currentHeight;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginTop: statusBarHeight,
    backgroundColor: theme.colors.backgroundColor,
  },
});

const initialState = () => ({
  key: null,
  placeTitle: '',
  text: '',
  daily: [],
});

export default class WeatherScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = initialState();

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onPlaceSelected = this.onPlaceSelected.bind(this);
    this.updateWeatherForecasts = this.updateWeatherForecasts.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.unsubscribeFocusEvent = navigation.addListener('focus', this.onFocus);
    this.unsubscribeBlurEvent = navigation.addListener('blur', this.onBlur);
  }

  componentWillUnmount() {
    this.unsubscribeFocusEvent();
    this.unsubscribeBlurEvent();
  }

  onFocus() {
    const { route } = this.props;
    console.log(route);
  }

  onBlur() {
    const { navigation } = this.props;

    navigation.setParams({ key: null, placeTitle: '' });
  }

  async onPlaceSelected(data) {
    this.setState(initialState());

    const nearbyPlace = await getNearbyPlaceByGeoposition(data);

    if (nearbyPlace) {
      const { key, placeTitle } = nearbyPlace;

      this.setState(
        { key, placeTitle },
        () => this.updateWeatherForecasts(key),
      );
    }
  }

  async updateWeatherForecasts(key) {
    const forecast = await getWeekForecasts(key);

    this.setState(forecast);
  }

  render() {
    const {
      placeTitle,
      text,
      daily,
    } = this.state;

    return (
      <View style={styles.screenContainer}>
        <PlacesSearch
          apiKey={googleMapsAPIKey}
          language={language}
          predefinedPlaces={predefinedPlaces}
          onPlaceSelected={this.onPlaceSelected}
        />
        <ForecastView title={placeTitle} text={text} data={daily} />
      </View>
    );
  }
}
