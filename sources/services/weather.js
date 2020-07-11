import { accuweatherURL, accuweatherAPIKey } from '../assets/options';

export async function getNearbyPlaceByGeoposition() {
  return new Promise(resolve => setTimeout(() => resolve(
    {
      key: 1,
      localName: 'Kyiv',
      coordinate: {
        latitude: 50,
        longitude: 31,
      },
    },
  ), 1000));
}

export async function getCurrentConditions() {
  return new Promise(resolve => setTimeout(() => resolve(
    {
      weatherText: 'sunshine',
      metricValue: 35,
    },
  ), 1000));
}

export async function getNearbyPlaceByGeoposition1(coordinate) {
  try {
    const response = await fetch(`${accuweatherURL}/cities/geoposition/search?apikey=${accuweatherAPIKey}&q=${coordinate.latitude},${coordinate.longitude}`);
    const data = await response.json();
    const {
      Key: key,
      LocalizedName: localName,
      GeoPosition: {
        Latitude: latitude = coordinate.latitude,
        Longitude: longitude = coordinate.longitude,
      } = {},
    } = data;

    return {
      key,
      localName,
      coordinate: {
        latitude,
        longitude,
      },
    };
  } catch (error) {
    return null;
  }
}

export async function getCurrentConditions1(key) {
  try {
    const response = await fetch(`${accuweatherURL}/currentconditions/v1/${key}?apikey=${accuweatherAPIKey}`);
    const data = await response.json();
    const {
      WeatherText: weatherText,
      Temperature: {
        Metric: {
          Value: metricValue,
        } = {},
      } = {},
    } = data[0] || {};

    return {
      weatherText,
      metricValue,
    };
  } catch (error) {
    return null;
  }
}
