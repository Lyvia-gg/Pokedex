// const matchers = require('jest-extended');
// expect.extend(matchers);

// afterEach(() => {
//   jest.useRealTimers();
// });

import '@testing-library/jest-native/extend-expect';

// Mock des modules Expo/React Native qui posent souvent problème
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
}));

// jest.mock('expo-secure-store', () => ({
//   getItemAsync: jest.fn(null),
//   setItemAsync: jest.fn(true),
//   deleteItemAsync: jest.fn(),
// }));
// jest.mock('@react-native-async-storage/async-storage', () =>
//   require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
// );

jest.mock('expo-secure-store');
jest.mock('redux-store');
