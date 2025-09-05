import { configureStore } from '@reduxjs/toolkit';
import reducer from '@/redux/reducers/pokemonReducer';
import {
  getFilters,
  getPokedex,
  selectPokemon,
  setFilter,
  signIn,
  signOut,
} from '@/redux/actions/pokemonAction';
import { IFilters } from '@/redux/store/type';
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

  test('getFilter', async () => {
    await store.dispatch(getFilters());
    const state = store.getState().filters.filterList;

    expect(state).not.toBeNull();
  });

  test('setFilter : type normal, form null', async () => {
    const filter: IFilters = { form: null, type: 'normal', searchingValue: null };
    await store.dispatch(setFilter(filter));
    const state = store.getState().pokemons.filters;

    expect(state).not.toBeNull();
  });

  test('setFilter : type normal, form quadriped', async () => {
    const filter: IFilters = { form: 'quadriped', type: 'normal', searchingValue: null };
    await store.dispatch(setFilter(filter));
    const state = store.getState().pokemons.filters;

    expect(state).not.toBeNull();
  });

  test('setFilter : type null, form quadriped', async () => {
    const filter: IFilters = { form: 'quadriped', type: null, searchingValue: null };
    await store.dispatch(setFilter(filter));
    const state = store.getState().pokemons.filters;

    expect(state).not.toBeNull();
  });

  test('setFilter : type null, form null', async () => {
    const filter: IFilters = { form: null, type: null, searchingValue: null };
    await store.dispatch(setFilter(filter));
    const state = store.getState().pokemons.filters;

    expect(state).toBeNull();
  });
});
