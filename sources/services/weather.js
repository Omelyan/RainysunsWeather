import { accuweatherURL, accuweatherAPIKey } from '../assets/options';

export async function getNearbyPlaceByGeoposition() {
  return new Promise(resolve => setTimeout(() => resolve(
    {
      key: 32,
      // placeTitle: 'Kyiv the capital of Ukraine, Kyivska oblast',
      placeTitle: ['Odessa', 'Kyiv'][Math.random().toFixed()],
      coordinate: {
        latitude: 50,
        longitude: 31,
      },
    },
  ), 300));
}

export async function getCurrentConditions() {
  return new Promise(resolve => setTimeout(() => resolve(
    {
      // currentMood: 'sunshine rainy day with storms and freez',
      currentMood: 'sunshine rainy',
      metricValue: (10 * Math.random()).toFixed(),
    },
  ), 300));
}

const dummy = [
  {
    Date: '2020-07-11T07:00:00+03:00',
    EpochDate: 1594440000,
    Temperature: {
      Minimum: {
        Value: 17.5,
        Unit: 'C',
        UnitType: 17,
      },
      Maximum: {
        Value: 32.2,
        Unit: 'C',
        UnitType: 17,
      },
    },
    Day: {
      Icon: 1,
      IconPhrase: 'Sunny',
      HasPrecipitation: false,
    },
    Night: {
      Icon: 34,
      IconPhrase: 'Mostly clear',
      HasPrecipitation: false,
    },
    Sources: [
    ],
    MobileLink: 'http://m.accuweather.com/en/ua/kyiv/324505/daily-weather-forecast/324505?day=1&unit=c&lang=en-us',
    Link: 'http://www.accuweather.com/en/ua/kyiv/324505/daily-weather-forecast/324505?day=1&unit=c&lang=en-us',
  },
  {
    Date: '2020-07-12T07:00:00+03:00',
    EpochDate: 1594526400,
    Temperature: {
      Minimum: {
        Value: Math.random() * 10,
        Unit: 'C',
        UnitType: 17,
      },
      Maximum: {
        Value: 29.7,
        Unit: 'C',
        UnitType: 17,
      },
    },
    Day: {
      Icon: 16,
      IconPhrase: 'Mostly cloudy w/ t-storms, rains, tears, and heavens, OMG, I am so lonely here',
      HasPrecipitation: true,
      PrecipitationType: 'Rain',
      PrecipitationIntensity: 'Moderate',
    },
    Night: {
      Icon: 42,
      IconPhrase: 'Mostly cloudy w/ t-storms',
      HasPrecipitation: true,
      PrecipitationType: 'Rain',
      PrecipitationIntensity: 'Moderate',
    },
    Sources: [
    ],
    MobileLink: 'http://m.accuweather.com/en/ua/kyiv/324505/daily-weather-forecast/324505?day=2&unit=c&lang=en-us',
    Link: 'http://www.accuweather.com/en/ua/kyiv/324505/daily-weather-forecast/324505?day=2&unit=c&lang=en-us',
  },
  {
    Date: '2020-07-13T07:00:00+03:00',
    EpochDate: 1594612800,
    Temperature: {
      Minimum: {
        Value: 12.4,
        Unit: 'C',
        UnitType: 17,
      },
      Maximum: {
        Value: 20.7,
        Unit: 'C',
        UnitType: 17,
      },
    },
    Day: {
      Icon: 13,
      IconPhrase: 'Mostly cloudy w/ showers',
      HasPrecipitation: true,
      PrecipitationType: 'Rain',
      PrecipitationIntensity: 'Light',
    },
    Night: {
      Icon: 35,
      IconPhrase: 'Partly cloudy',
      HasPrecipitation: false,
    },
    Sources: [
    ],
    MobileLink: 'http://m.accuweather.com/en/ua/kyiv/324505/daily-weather-forecast/324505?day=3&unit=c&lang=en-us',
    Link: 'http://www.accuweather.com/en/ua/kyiv/324505/daily-weather-forecast/324505?day=3&unit=c&lang=en-us',
  },
  {
    Date: '2020-07-14T07:00:00+03:00',
    EpochDate: 1594699200,
    Temperature: {
      Minimum: {
        Value: 12.6,
        Unit: 'C',
        UnitType: 17,
      },
      Maximum: {
        Value: 21.8,
        Unit: 'C',
        UnitType: 17,
      },
    },
    Day: {
      Icon: 6,
      IconPhrase: 'Mostly cloudy',
      HasPrecipitation: false,
    },
    Night: {
      Icon: 35,
      IconPhrase: 'Partly cloudy',
      HasPrecipitation: false,
    },
    Sources: [
    ],
    MobileLink: 'http://m.accuweather.com/en/ua/kyiv/324505/daily-weather-forecast/324505?day=4&unit=c&lang=en-us',
    Link: 'http://www.accuweather.com/en/ua/kyiv/324505/daily-weather-forecast/324505?day=4&unit=c&lang=en-us',
  },
  {
    Date: '2020-07-15T07:00:00+03:00',
    EpochDate: 1594785600,
    Temperature: {
      Minimum: {
        Value: 13.1,
        Unit: 'C',
        UnitType: 17,
      },
      Maximum: {
        Value: 23.1,
        Unit: 'C',
        UnitType: 17,
      },
    },
    Day: {
      Icon: 4,
      IconPhrase: 'Intermittent clouds',
      HasPrecipitation: false,
    },
    Night: {
      Icon: 36,
      IconPhrase: 'Intermittent clouds',
      HasPrecipitation: false,
    },
    Sources: [
    ],
    MobileLink: 'http://m.accuweather.com/en/ua/kyiv/324505/daily-weather-forecast/324505?day=5&unit=c&lang=en-us',
    Link: 'http://www.accuweather.com/en/ua/kyiv/324505/daily-weather-forecast/324505?day=5&unit=c&lang=en-us',
  },
];

export async function getWeekForecasts() {
  return new Promise(resolve => setTimeout(() => resolve(
    {
      text: 'sweety rainy days, and the sun is broken.',
      daily: dummy,
    },
  ), 500));
}

// export async function getNearbyPlaceByGeoposition(coordinate) {
//   try {
//     const response = await fetch(`${accuweatherURL}/locations/v1/cities/geoposition/search?apikey=${accuweatherAPIKey}&q=${coordinate.latitude},${coordinate.longitude}&toplevel=true`);
//     const data = await response.json();
//     const {
//       Key: key,
//       LocalizedName: placeTitle,
//       GeoPosition: {
//         Latitude: latitude = coordinate.latitude,
//         Longitude: longitude = coordinate.longitude,
//       } = {},
//     } = data;

//     return {
//       key,
//       placeTitle,
//       coordinate: {
//         latitude,
//         longitude,
//       },
//     };
//   } catch (error) {
//     return null;
//   }
// }

// export async function getCurrentConditions(key) {
//   try {
//     const response = await fetch(`${accuweatherURL}/currentconditions/v1/${key}?apikey=${accuweatherAPIKey}`);
//     const data = await response.json();
//     const {
//       WeatherText: currentMood,
//       Temperature: {
//         Metric: {
//           Value: metricValue,
//         } = {},
//       } = {},
//     } = data[0] || {};

//     return {
//       currentMood,
//       metricValue,
//     };
//   } catch (error) {
//     return null;
//   }
// }

// export async function getWeekForecasts(key) {
//   try {
//     const response = await fetch(`${accuweatherURL}/forecasts/v1/daily/5day/${key}?apikey=${accuweatherAPIKey}&metric=true`);
//     const data = await response.json();
//     const {
//       Headline: { Text: text } = {},
//       DailyForecasts: daily = [],
//     } = data;

//     return { text, daily };
//   } catch (error) {
//     return null;
//   }
// }
