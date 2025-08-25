import { createAction, Dispatch } from '@reduxjs/toolkit';
import * as actionTypes from '@/redux/store/actionTypes';
import { getPokedexByGenerationApi } from '@/constants/api';

//export const pokemonAction = createAction('action/pokemon');

// export function getPokemon(pokemon: IPokemon) {
//   const action: PokemonAction = {
//     type: actionTypes.GET_POKEMON,
//     pokemon,
//   };

//   return simulateHttpRequest(action);
// }

// export function removePokemon(pokemons: IPokemon) {
//   const action: PokemonAction = {
//     type: actionTypes.REMOVE_POKEMON,
//     pokemons,
//   };
//   return simulateHttpRequest(action);
// }

export function getPokedexByGeneration(numGen: number) {
  return async (dispatch: Dispatch<any>) => {
    let response = await getPokedexByGenerationApi(numGen);
    let pokemons: IPokemon[] = await response.json();
    const action: GetPokemonAction = {
      type: actionTypes.GET_POKEMON,
      pokemons,
    };
    dispatch(action, pokemons);
  };
}
