import { createAction } from '@reduxjs/toolkit';
import * as actionTypes from '@/redux/store/actionTypes';

//export const pokemonAction = createAction('action/pokemon');

export function addArticle(pokemon: IPokemon) {
  const action: PokemonAction = {
    type: actionTypes.ADD_POKEMON,
    pokemon,
  };

  return simulateHttpRequest(action);
}

export function removeArticle(pokemon: IPokemon) {
  const action: PokemonAction = {
    type: actionTypes.REMOVE_POKEMON,
    pokemon,
  };
  return simulateHttpRequest(action);
}

export function simulateHttpRequest(action: PokemonAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action);
    }, 500);
  };
}
