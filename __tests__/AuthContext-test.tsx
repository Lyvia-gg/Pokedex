import React from 'react';
import { render, screen, fireEvent, renderHook, act } from '@testing-library/react-native';
// import { describe, expect, test } from '@jest/globals';
import { SessionProvider, useSession } from '@/context/AuthContext';
import * as SecureStore from 'expo-secure-store';

describe('<SessionProvider />', () => {
  beforeEach(() => {
    // initialisation avant chaque test (factorisation)
  });
  //   test('SessionProvier : getSession vide', async () => {

  //   });
  //   test('SessionProvier : signIn vide', async () => {});
  test('SessionProvier : signIn', async () => {
    const wrapper = ({ children }: any) => <SessionProvider>{children}</SessionProvider>;

    const { result } = renderHook(() => useSession(), { wrapper });
    // (SecureStore.setItemAsync as jest.Mock).mockResolvedValueOnce(undefined);
    await act(async () => {
      await result.current.signIn({
        email: 'chuck.noris@gmail.com',
        password: "Au commencement, il regarda Arceus crée l'univers",
      });
    });
    if (result.current.session) {
      const parsed = JSON.parse(result.current.session);
      expect(parsed.email).toBe('chuck.noris@gmail.com');
      expect(parsed.password).toBe("Au commencement, il regarda Arceus crée l'univers");
    }
  });
  //   test('SessionProvier : getSession', async () => {});
  //   test('SessionProvier : signOut', async () => {});
});
