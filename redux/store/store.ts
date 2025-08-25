import { applyMiddleware, configureStore, createStore, Store } from '@reduxjs/toolkit';
import reducer from '@/redux/reducers/pokemonReducer';
import { thunk } from 'redux-thunk';

export const store: Store<PokemonState, PokemonAction> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));
