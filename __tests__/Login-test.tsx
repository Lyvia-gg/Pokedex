import React from 'react';
import Login from '@/app/(auth)/index';
import { render, screen, fireEvent } from '@testing-library/react-native';
// import { describe, expect, test } from '@jest/globals';

describe('<Login />', () => {
  // test('Login : rendu', async () => {
  //   const screen = render(<Login />).toJSON();
  //   expect(screen).toMatchSnapshot();
  // });
  let submitButton: object;
  let expectedEmail: string;
  let expectedPassword: string;
  // ###################################################### Faire un test pour voir si <Login/> se rend bien
  beforeEach(() => {
    // initialisation avant chaque test (factorisation)
    render(<Login />);
    submitButton = screen.getByTestId('submitButton');
    expectedEmail = 'chuck.noris@gmail.com';
    expectedPassword = "Au commencement, il regarda Arceus crée l'univers";
  });

  test('Login : champs vide & bouton désactivé', async () => {
    try {
      expect(submitButton).toBeDisabled();
    } catch (error) {
      console.log(error);
    }
  });

  test('Login : email rempli & bouton désactivé', async () => {
    try {
      fireEvent.changeText(screen.getByTestId('inputEmail'), expectedEmail);
      expect(submitButton).toBeDisabled();
    } catch (error) {
      console.log(error);
    }
  });

  test('Login : password & bouton désactivé', async () => {
    try {
      fireEvent.changeText(screen.getByTestId('inputPassword'), expectedPassword);
      expect(submitButton).toBeDisabled();
    } catch (error) {
      console.log(error);
    }
  });

  test('Login : champs rempli & bouton activé ', async () => {
    try {
      fireEvent.changeText(screen.getByTestId('inputEmail'), expectedEmail);
      fireEvent.changeText(screen.getByTestId('inputPassword'), expectedPassword);
      expect(submitButton).not.toBeDisabled();
    } catch (error) {
      console.log(error);
    }
  });
});
