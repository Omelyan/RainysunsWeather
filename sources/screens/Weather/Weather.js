import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { PlacesSearch, ForecastView } from '../../components';
import { getNearbyPlaceByGeoposition, getWeekForecasts } from '../../services/weather';
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
  placeTitle: '',
  text: '',
  daily: [],
});

export default class WeatherScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = initialState();

    this.searchInputRef = React.createRef();

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onPlaceSelected = this.onPlaceSelected.bind(this);
    this.updateWeatherForecasts = this.updateWeatherForecasts.bind(this);
    this.focusToSearchInput = this.focusToSearchInput.bind(this);
    this.tabPress = this.tabPress.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.unsubscribeFocusEvent = navigation.addListener('focus', this.onFocus);
    this.unsubscribeBlurEvent = navigation.addListener('blur', this.onBlur);
    this.unsubscribeTabPress = navigation.addListener('tabPress', this.tabPress);
  }

  componentWillUnmount() {
    this.unsubscribeFocusEvent();
    this.unsubscribeBlurEvent();
    this.unsubscribeTabPress();
  }

  onFocus() {
    const { route } = this.props;
    const { key, placeTitle } = route.params;

    if (key) {
      this.setState({ ...initialState(), placeTitle });
      this.updateWeatherForecasts(key);
    } else {
      this.focusToSearchInput();
    }
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
        { placeTitle },
        () => this.updateWeatherForecasts(key),
      );
    }
  }

  focusToSearchInput() {
    if (this.searchInputRef.current) {
      this.searchInputRef.current.focus();
      this.searchInputRef.current.clear();
    }
  }

  tabPress() {
    this.focusToSearchInput();
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
          inputRef={this.searchInputRef}
        />
        <ForecastView title={placeTitle} text={text} data={daily} />
      </View>
    );
  }
}
