export const googleMapsAPIKey = 'AIzaSyAxBXdrrJ5sF1i7MmEXvf4K9uYci9tx1g8';

export const accuweatherURL = 'https://dataservice.accuweather.com';
export const accuweatherAPIKey = 'pTAn3UqACfg7Jea3gpQwrhaaV0YWw52b';

export const defaultRegion = {
  latitude: 40,
  longitude: 30,
  latitudeDelta: 20,
  longitudeDelta: 20,
};

export const animationOptions = {
  duration: {
    default: 200,
  },
};

export const theme = {
  colors: {
    lightTint: '#F2F0EB90',
    pinColor: '#F25041',
    backgroundColor: 'white',

    primary: {
      default: '#F2F0EB',
      darker: '#E0DEDA',
      text: {
        default: '#222',
        dimmed: '#00000050',
        light: '#00000020',
        accent1: '#05C7F2',
        accent2: '#F25041',
      },
    },

    secondary: {
      default: '#5196A6',
      text: {
        default: 'white',
        dimmed: '#ffffff90',
      },
    },
  },

  layout: {
    fontSize: {
      default: 16,
      smaller: 14,
      larger: 20,
      large: 36,
    },

    padding: {
      default: 18,
      double: 26,
      narrow: 9,
    },

    margin: {
      default: 18,
      narrow: 12,
      double: 24,
    },

    borderRadius: 7,
  },
};

export const language = 'en';
export const locales = 'en-US';

export const predefinedPlaces = [
  {
    description: 'Kyiv',
    geometry: { location: { lat: 50.4501, lng: 30.5234 } },
  },
  {
    description: 'Odessa',
    geometry: { location: { lat: 46.482526, lng: 30.7233095 } },
  },
];
