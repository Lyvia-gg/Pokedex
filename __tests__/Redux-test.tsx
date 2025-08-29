import { configureStore } from '@reduxjs/toolkit';
import reducer from '@/redux/reducers/pokemonReducer';
import { getPokedex, selectPokemon, signIn, signOut } from '@/redux/actions/pokemonAction';
describe('Redux', () => {
  let store: any;
  let expectedEmail: string;
  beforeEach(() => {
    // initialisation avant chaque test (factorisation)
    store = configureStore({ reducer: reducer });
    expectedEmail = 'chuck.noris@gmail.com';
  });
  test('Get Pokedex', async () => {
    await store.dispatch(getPokedex());
    const state = store.getState().pokemons.pokemonList;

    expect(state.length).toBeGreaterThan(0);
  });
  test('signIn', async () => {
    await store.dispatch(signIn(expectedEmail));
    const state = store.getState().user;

    expect(state.email).toBe(expectedEmail);
  });
  test('signOut', async () => {
    await store.dispatch(signOut());
    const state = store.getState().user;

    expect(state).toBeNull();
  });
  test('selectPokemon', async () => {
    await store.dispatch(selectPokemon(1));
    const state = store.getState().pokemons.selectedPokemon;

    expect(state).not.toBeNull();
  });
});
