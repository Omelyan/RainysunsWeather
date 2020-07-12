import { accuweatherURL, accuweatherAPIKey } from '../assets/options';

export async function getNearbyPlaceByGeoposition(coordinate) {
  try {
    const response = await fetch(`${accuweatherURL}/locations/v1/cities/geoposition/search?apikey=${accuweatherAPIKey}&q=${coordinate.latitude},${coordinate.longitude}&toplevel=true`);
    const data = await response.json();
    const {
      Key: key,
      LocalizedName: placeTitle,
      GeoPosition: {
        Latitude: latitude = coordinate.latitude,
        Longitude: longitude = coordinate.longitude,
      } = {},
    } = data;

    return {
      key,
      placeTitle,
      coordinate: {
        latitude,
        longitude,
      },
    };
  } catch (error) {
    return null;
  }
}

export async function getCurrentConditions(key) {
  try {
    const response = await fetch(`${accuweatherURL}/currentconditions/v1/${key}?apikey=${accuweatherAPIKey}`);
    const data = await response.json();
    const {
      WeatherText: currentMood,
      Temperature: {
        Metric: {
          Value: metricValue,
        } = {},
      } = {},
    } = data[0] || {};

    return {
      currentMood,
      metricValue,
    };
  } catch (error) {
    return null;
  }
}

export async function getWeekForecasts(key) {
  try {
    const response = await fetch(`${accuweatherURL}/forecasts/v1/daily/5day/${key}?apikey=${accuweatherAPIKey}&metric=true`);
    const data = await response.json();
    const {
      Headline: { Text: text } = {},
      DailyForecasts: daily = [],
    } = data;

    return { text, daily };
  } catch (error) {
    return null;
  }
}
