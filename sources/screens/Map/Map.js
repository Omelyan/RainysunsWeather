import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  PermissionsAndroid,
} from 'react-native';

import MapView, { Marker, Callout, AnimatedRegion } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import { WeatherPopup } from '../../components';

import { getNearbyPlaceByGeoposition, getCurrentConditions } from '../../services/weather';
import { defaultRegion, animationOptions, theme } from '../../assets/options';
import defaultMapStyle from './DefaultMapStyle.json';

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const getLocationPermissions = async (onSuccess) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Rainysuns Weather application Permissions',
        message: 'Rainysuns Weather needs access to your current location.',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      onSuccess();
    }
  } catch (error) {
    //
  }
};

export default class MapScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      region: defaultRegion,
      markerCoordinate: null,
      key: null,
      placeTitle: '',
      currentMood: '',
      metricValue: 0,
    };

    this.marker = React.createRef();

    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onLongPress = this.onLongPress.bind(this);
    this.setMarker = this.setMarker.bind(this);
    this.setRegion = this.setRegion.bind(this);
  }

  componentDidMount() {
    getLocationPermissions(() => this.getToLocation());
  }

  onRegionChangeComplete(region) {
    this.setRegion(region);
  }

  onPress() {
    this.setMarker();
  }

  onLongPress(event) {
    if (this.marker.current) {
      this.marker.current.hideCallout();
    }

    this.setMarker(event.nativeEvent.coordinate);
  }

  setMarker(coordinate) {
    const hideCallout = () => (this.marker.current ? this.marker.current.hideCallout() : null);

    if (coordinate) {
      // show marker
      this.setState(
        {
          markerCoordinate: new AnimatedRegion({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            latitudeDelta: 0,
            longitudeDelta: 0,
          }),
        },
        async () => {
          const nearbyPlace = await getNearbyPlaceByGeoposition(coordinate);

          if (nearbyPlace) {
            const { key, placeTitle, coordinate: nearbyPlaceCoordinate } = nearbyPlace;

            this.setState({ key, placeTitle });
            this.moveMarkerTo(nearbyPlaceCoordinate);
            getCurrentConditions(key)
              .then(conditions => this.setState(
                conditions,
                hideCallout, // react-native-maps callout redraw issue #486
              ))
              .catch(() => null);
          }
        },
      );
    } else {
      // remove marker
      this.setState({
        markerCoordinate: null,
      });
    }
  }

  setRegion(region) {
    this.setState({ region });
  }

  getToLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setTimeout(
          () => this.setRegion({
            latitude,
            longitude,
            latitudeDelta: 8,
            longitudeDelta: 8,
          }),
          1000,
        );
      },
      () => null,
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 },
    );
  }

  moveMarkerTo(coordinate) {
    const { markerCoordinate } = this.state;

    if (markerCoordinate === null) return;

    this.marker.current.animateMarkerToCoordinate(
      {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      },
      animationOptions.duration.default,
    );
  }

  navigateToWeekForecast(key, placeTitle) {
    const { navigation } = this.props;

    navigation.navigate('Weather forecast', { key, placeTitle });
  }

  render() {
    const {
      region,
      markerCoordinate,
      key,
      placeTitle,
      currentMood,
      metricValue,
    } = this.state;

    return (
      <>
        <StatusBar translucent barStyle="dark-content" backgroundColor={theme.colors.lightTint} />
        <View style={styles.mapContainer}>

          <MapView
            style={styles.map}
            region={region}
            customMapStyle={defaultMapStyle}
            onRegionChangeComplete={this.onRegionChangeComplete}
            onPress={this.onPress}
            onLongPress={this.onLongPress}
          >
            {/* Marker */}
            {markerCoordinate !== null && (
              <Marker.Animated
                ref={this.marker}
                coordinate={markerCoordinate}
                pinColor={theme.colors.pinColor}
              >
                {/* Popup */}
                <Callout
                  tooltip
                  onPress={() => this.navigateToWeekForecast(key, placeTitle)}
                >
                  <WeatherPopup title={placeTitle} mood={currentMood} value={metricValue} />
                </Callout>
              </Marker.Animated>
            )}
          </MapView>

        </View>
      </>
    );
  }
}
