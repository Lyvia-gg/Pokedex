// import * as SecureStore from 'expo-secure-store';

// jest.mock('expo-secure-store', () => ({
//   setItemAsync: jest.fn(async (key, value) => Promise.resolve(true)),
//   getItemAsync: jest.fn(async (key) => Promise.resolve(null)),
//   deleteItemAsync: jest.fn(async (key) => Promise.resolve()),
// }));
export const setItemAsync = jest.fn(async (key, value) => Promise.resolve(true));
export const getItemAsync = jest.fn(async (key) => Promise.resolve(null));
export const deleteItemAsync = jest.fn(async (key) => Promise.resolve());
