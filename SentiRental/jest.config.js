module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|react-native-.*|@supabase)/)',
  ],
  setupFiles: [
    require.resolve('react-native/jest/setup.js'),
    '<rootDir>/jest.setup.js',
  ],
};
