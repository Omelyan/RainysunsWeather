import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { theme } from '../../assets/options';

const searchComponentStyles = {
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary.default,
    paddingHorizontal: theme.layout.padding.default,
    paddingVertical: theme.layout.padding.narrow,
    paddingRight: theme.layout.padding.narrow,
    borderColor: theme.colors.primary.darker,
    borderBottomWidth: 1,
  },

  textInput: {
    flex: 1,
    padding: 0,
    fontSize: theme.layout.fontSize.default,
    color: theme.colors.primary.text.default,
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
    color: theme.colors.primary.text.default,
  },

  buttonContainer: {
    marginLeft: 'auto',
    paddingLeft: theme.layout.padding.narrow,
  },

  submitButton: {
    paddingHorizontal: theme.layout.padding.narrow,
    paddingVertical: theme.layout.padding.narrow,
    backgroundColor: theme.colors.secondary.default,
    borderRadius: theme.layout.borderRadius,
    fontSize: theme.layout.fontSize.smaller,
    color: theme.colors.secondary.text.default,
  },
});

export default class PlacesSearch extends React.PureComponent {
  static Row = data => (
    <View style={styles.row}>
      <Text style={styles.rowText} numberOfLines={1}>{data.description}</Text>
    </View>
  );

  static SubmitButton = onPress => (
    <View style={styles.buttonContainer}>
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <Text style={styles.submitButton}>Search</Text>
      </TouchableOpacity>
    </View>
  );

  constructor(props) {
    super(props);

    this.state = {};

    this.ref = React.createRef();

    this.querySelected = this.querySelected.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { current } = this.ref;

    // I'am ashamed of this part of code...
    if (current.getAddressText().length > 0) {
      current._onPress(current.state.dataSource[0]);
    }
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
      inputRef,
    } = this.props;

    return (
      <GooglePlacesAutocomplete
        textInputProps={{
          ref: inputRef,
        }}
        ref={this.ref}
        placeholder="Search places..."
        onPress={this.querySelected}
        query={{ key: apiKey, language, types: '(cities)' }}
        fetchDetails
        predefinedPlaces={predefinedPlaces}
        autoFillOnNotFound
        debounce={200}
        minLength={1}
        enablePoweredByContainer={false}
        renderRightButton={() => PlacesSearch.SubmitButton(this.onSubmit)}
        renderRow={PlacesSearch.Row}
        styles={searchComponentStyles}
        suppressDefaultStyles
        placeholderTextColor={theme.colors.primary.text.dimmed}
        returnKeyType="search"
      />
    );
  }
}
