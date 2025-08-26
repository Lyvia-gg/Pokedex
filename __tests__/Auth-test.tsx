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
  beforeEach(() => {
    // initialisation avant chaque test (factorisation)
    render(<Login />);
    submitButton = screen.getByTestId('submitButton');
    expectedEmail = 'chuck.noris@gmail.com';
    expectedPassword = "Au commencement, il regarda Arceus crée l'univers";
  });

  test('Login : champs vide & bouton désactivé', async () => {
    expect(submitButton).toBeDisabled();
  });

  test('Login : email rempli & bouton désactivé', async () => {
    fireEvent.changeText(screen.getByTestId('inputEmail'), expectedEmail);
    expect(submitButton).toBeDisabled();
  });

  test('Login : password & bouton désactivé', async () => {
    fireEvent.changeText(screen.getByTestId('inputPassword'), expectedPassword);
    expect(submitButton).toBeDisabled();
  });

  test('Login : champs rempli & bouton activé ', async () => {
    fireEvent.changeText(screen.getByTestId('inputEmail'), expectedEmail);
    fireEvent.changeText(screen.getByTestId('inputPassword'), expectedPassword);
    expect(submitButton).not.toBeDisabled();
  });
});
