import React from 'react';
import {
  View,
} from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { googleMapsAPIKey } from '../../assets/options';

export default class WeatherScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <GooglePlacesAutocomplete
          placeholder="Search..."
          onPress={(data, details) => {
            console.log(data, details);
          }}
          query={{
            key: googleMapsAPIKey,
            language: 'en',
          }}
          fetchDetails
        />
      </View>
    );
  }
}
