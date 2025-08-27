import { createAction, Dispatch } from '@reduxjs/toolkit';
import * as actionTypes from '@/redux/store/actionTypes';
import { getPokedexByGenerationApi } from '@/constants/api';
import { useDispatch, useSelector, shallowEqual, ReactReduxContext } from 'react-redux';
import { store } from '@/redux/store/store';

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
    const actionGet: GetPokemonAction = {
      type: actionTypes.GET_POKEMON,
    };
    dispatch(actionGet);
    let response = await getPokedexByGenerationApi(numGen);
    let pokemons: IPokemon[] = await response.json();
    // const half = Math.ceil(pokemons.length / 4);
    // const firstPart = pokemons.slice(0, half);
    const action: SetPokemonAction = {
      type: actionTypes.SET_POKEMON,
      pokemons,
    };
    dispatch(action, pokemons);
  };
}
export function selectPokemon(pokedex_id: number) {
  return async (dispatch: Dispatch<any>) => {
    // const actionLoading: IsLoadingPokemonAction = {
    //   type: actionTypes.ISLOADING_POKEMON,
    // };
    // dispatch(actionLoading);
    const pokemonsList: readonly IPokemon[] = store.getState().pokemons;
    let pokemonSelected = pokemonsList.filter((pokemon) => {
      // console.log(pokemon);
      return pokemon.pokedex_id == pokedex_id;
    });
    // console.log('select pokemon', pokemonSelected);
    // let pokemon: IPokemon =
    const action: SelectPokemonAction = {
      type: actionTypes.SELECT_POKEMON,
      selectedPokemon: pokemonSelected[0],
    };
    dispatch(action, pokemonSelected);
  };
}
