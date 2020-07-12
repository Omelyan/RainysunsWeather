export const googleMapsAPIKey = 'AIzaSyAxBXdrrJ5sF1i7MmEXvf4K9uYci9tx1g8';

export const accuweatherURL = 'https://dataservice.accuweather.com';
export const accuweatherAPIKey = 'pTAn3UqACfg7Jea3gpQwrhaaV0YWw52b';

export const defaultRegion = {
  latitude: 50,
  longitude: 31,
  latitudeDelta: 15,
  longitudeDelta: 15,
};

export const animationOptions = {
  duration: {
    default: 200,
    long: 600,
  },
};

export const theme = {
  colors: {
    backgroundColor: 'white',

    primary: {
      default: '#F2F0EB',
      darker: '#E0DEDA',
      lightTint: '#F2F0EB40',
      text: {
        default: '#222',
        dimmed: '#00000050',
        light: '#00000020',
        accent1: '#17B3EB',
      },
    },

    secondary: {
      default: '#F4A93E',
      text: {
        default: 'white',
        dimmed: '#ffffff90',
      },
    },

    accent: {
      default: '#F25041',
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

    borderRadius: 8,
  },
};

export const language = 'en';
export const locales = 'en-US';

export const predefinedPlaces = [
  {
    description: 'Kyiv',
    geometry: { location: { lat: 50.45, lng: 30.52 } },
  },
  {
    description: 'Odessa',
    geometry: { location: { lat: 46.48, lng: 30.72 } },
  },
];
