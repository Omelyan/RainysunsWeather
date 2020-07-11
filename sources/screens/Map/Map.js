import React from 'react';
import {
  StyleSheet,
  View,
  PermissionsAndroid,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import { getNearbyPlaceByGeoposition, getCurrentConditions } from '../../services/weather';
import defaultMapStyle from './DefaultMapStyle.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
      region: {
        latitude: 25,
        longitude: 25,
        latitudeDelta: 60,
        longitudeDelta: 60,
      },

      markerIsVisible: false,
      markerCoordinates: null,

      localName: '',
      weatherText: '',
      metricValue: 0,
    };

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
    this.setMarker(event.nativeEvent.coordinate);
  }

  async setMarker(coordinate) {
    if (coordinate) {
      this.setState({ markerIsVisible: true, markerCoordinates: coordinate });

      const nearbyPlace = await getNearbyPlaceByGeoposition(coordinate);
      if (nearbyPlace) {
        const {
          key,
          localName,
          coordinate: nearbyPlaceCoordinate,
        } = nearbyPlace;

        this.setState({
          markerCoordinates: nearbyPlaceCoordinate,
          localName,
        });

        const currentConditions = await getCurrentConditions(key);
        if (currentConditions) {
          this.setState(currentConditions);
        }
      }
    } else {
      this.setState({ markerIsVisible: false });
    }
  }

  setRegion(region) {
    this.setState({ region });
  }

  getToLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        this.setRegion({
          latitude,
          longitude,
          latitudeDelta: 8,
          longitudeDelta: 8,
        });
      },
      () => null,
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 },
    );
  }

  render() {
    const {
      region,
      markerIsVisible,
      markerCoordinates,
      localName,
      weatherText,
      metricValue,
    } = this.state;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={region}
          customMapStyle={defaultMapStyle}
          onRegionChangeComplete={this.onRegionChangeComplete}
          onPress={this.onPress}
          onLongPress={this.onLongPress}
        >
          {markerIsVisible && (
            <Marker
              coordinate={markerCoordinates}
              title={localName}
              description={`${weatherText}: ${metricValue}C`}
            />
          )}
        </MapView>
      </View>
    );
  }
}
