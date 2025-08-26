// module.exports = {
//   preset: 'jest-expo',
//   transform: {
//     '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
//   },
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/$1',
//   },
//   transformIgnorePatterns: [
//     'node_modules/(?!(react-native|expo|@expo|@react-native|@testing-library)/)',
//   ],
// };

// /** @type {import('jest').Config} */
// module.exports = {
//   preset: 'jest-expo',
//   transform: {
//     '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
//   },
//   moduleNameMapper: {
//     '^@/(.*)$': '<rootDir>/$1',
//   },
//   transformIgnorePatterns: [
//     // 'node_modules/(?!(expo|expo-router|expo-modules-core|react-native|@expo|@react-native|@testing-library)/)',
//     'node_modules/(?!(expo-router|expo-linking|expo-modules-core|@react-navigation|react-native|react-native-.*|@react-native|@expo)/)',
//   ],
//   setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', '<rootDir>/setup-jest.js'],
// };

/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^expo-secure-store$': '<rootDir>/__mocks__/expo-secure-store.ts',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(expo|expo-router|expo-linking|expo-modules-core|@react-navigation|react-native|react-native-.*|@react-native|@expo)/)',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', '<rootDir>/setup-jest.js'],
};
