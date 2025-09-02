import '@testing-library/jest-native/extend-expect';
import { fetchMock } from './__mocks__/fetch';

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
}));

jest.mock('expo-secure-store');
jest.mock('redux-store');

beforeAll(() => {
  fetchMock();
});
