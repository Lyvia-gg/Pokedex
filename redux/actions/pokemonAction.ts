import { createAction, Dispatch } from '@reduxjs/toolkit';
import * as actionTypes from '@/redux/store/actionTypes';
import { getDetailsPokemonApi, getPokedexOffsetApi, getPokemonApi } from '@/constants/api';
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

export function signIn(email: string) {
  return (dispatch: Dispatch<any>) => {
    const action: SignIn = {
      type: actionTypes.SIGN_IN,
      email,
    };
    dispatch(action, email);
  };
}

export function signOut() {
  return async (dispatch: Dispatch<any>) => {
    const action: SignOut = {
      type: actionTypes.SIGN_OUT,
    };
    dispatch(action);
  };
}

export function getPokedex() {
  return async (dispatch: Dispatch<any>) => {
    const actionGet: GetPokemonAction = {
      type: actionTypes.GET_POKEMON,
    };
    dispatch(actionGet);
    const offset = store.getState().pokemons.nextPage;
    let response = await getPokedexOffsetApi(offset);
    let pokemons: any = await response.json();
    const action: SetPokemonAction = {
      type: actionTypes.SET_POKEMON,
      pokemons: pokemons.results,
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
    // const pokemonsList: readonly IPokemonList[] = store.getState().pokemons;
    // let pokemonSelected = pokemonsList.filter((pokemon) => {
    //   // console.log(pokemon);
    //   return pokemon.pokedex_id == pokedex_id;
    // });
    let response = await getPokemonApi(pokedex_id);
    let pokemon: any = await response.json();
    let responseSpecies = await getDetailsPokemonApi(pokedex_id);
    let pokemonSpecies: any = await responseSpecies.json();
    let flavor_text = pokemonSpecies.flavor_text_entries.filter((entries: any) => {
      // console.log(pokemon);
      return entries.language.name == 'en';
    });
    // console.log(flavor_text);

    // 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/' +
    // pokemonSpecies.id +
    // '.png',
    const action: SelectPokemonAction = {
      type: actionTypes.SELECT_POKEMON,
      selectedPokemon: {
        name: pokemonSpecies.name,
        pokedex_id: pokemonSpecies.id,
        sprite: {
          regular: pokemon.sprites.front_default,
        },
        description: flavor_text[flavor_text.length - 1].flavor_text,
        genera: pokemonSpecies.genera[7] ? pokemonSpecies.genera[7].genus : '',
        types: pokemon.types,
      },
    };
    dispatch(action, pokemonSpecies);
    // console.log('select pokemon', pokemonSelected);
    // let pokemon: IPokemon =
    // const action: SelectPokemonAction = {
    //   type: actionTypes.SELECT_POKEMON,
    //   selectedPokemon: pokemonSelected[0],
    // };
    // dispatch(action, pokemonSelected);
  };
}
