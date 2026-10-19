require('react-native-gesture-handler/jestSetup');
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock('react-native/Libraries/Utilities/BackHandler', () => ({
  addEventListener: jest.fn(() => ({ remove: jest.fn() })),
  removeEventListener: jest.fn(),
  exitApp: jest.fn(),
}));

jest.mock('./src/lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(async () => ({ data: { user: null }, error: null })),
      signUp: jest.fn(async () => ({ data: { user: null }, error: null })),
    },
  },
}));
