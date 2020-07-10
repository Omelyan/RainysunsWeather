module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
  ],
  parser: 'babel-eslint',
  plugins: [
    'react',
    'react-native',
  ],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
  },
};
