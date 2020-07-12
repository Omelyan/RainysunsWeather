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
    'react/prop-types': ['warn', { skipUndeclared: true }],
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    'dot-notation': ['error', { allowPattern: '^[A-Z][A-Za-z_]+' }],
    'max-len': ['warn', { code: 120, ignoreComments: true }],
  },
};
