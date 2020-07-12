import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { theme } from '../../assets/options';

const searchComponentStyles = {
  textInputContainer: {
    backgroundColor: theme.colors.primary.default,
    paddingHorizontal: theme.layout.padding.default,
    paddingVertical: theme.layout.padding.narrow,
    borderColor: theme.colors.primary.darker,
    borderBottomWidth: 1,
  },

  textInput: {
    padding: 0,
    fontSize: theme.layout.fontSize.default,
    color: theme.colors.text.default,
  },

  listView: {
    borderColor: theme.colors.primary.darker,
    borderBottomWidth: 1,
  },
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: theme.layout.padding.default,
    paddingVertical: theme.layout.padding.narrow,
    backgroundColor: 'white',
  },

  rowText: {
    fontSize: theme.layout.fontSize.smaller,
    color: theme.colors.text.default,
  },
});

export default class PlacesSearch extends React.PureComponent {
  static Row = data => (
    <View style={styles.row}>
      <Text style={styles.rowText} numberOfLines={1}>{data.description}</Text>
    </View>
  );

  constructor(props) {
    super(props);

    this.state = {};

    this.querySelected = this.querySelected.bind(this);
  }

  querySelected(data = {}, details = {}) {
    const { onPlaceSelected } = this.props;
    const { description } = data;
    const {
      geometry: {
        location: {
          lat: latitude,
          lng: longitude,
        } = {},
      } = {},
    } = details;

    onPlaceSelected({ description, latitude, longitude });
  }

  render() {
    const {
      apiKey,
      language,
      predefinedPlaces,
    } = this.props;

    return (
      <GooglePlacesAutocomplete
        placeholder="Search places..."
        onPress={this.querySelected}
        query={{ key: apiKey, language }}
        fetchDetails
        predefinedPlaces={predefinedPlaces}
        autoFillOnNotFound
        debounce={200}
        minLength={1}
        enablePoweredByContainer={false}
        // GooglePlacesDetailsQuery
        // listEmptyComponent
        // renderLeftButton
        // renderRightButton
        renderRow={PlacesSearch.Row}
        styles={searchComponentStyles}
        suppressDefaultStyles
        placeholderTextColor={theme.colors.text.dimmed}
      />
    );
  }
}
