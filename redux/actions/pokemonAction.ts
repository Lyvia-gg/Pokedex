import { createAction, Dispatch } from '@reduxjs/toolkit';
import * as actionTypes from '@/redux/store/actionTypes';
import {
  getDetailsPokemonApi,
  getPokedexOffsetApi,
  getPokemonApi,
  getPokemonByFormApi,
  getPokemonByTypeApi,
} from '@/constants/api';
import { useDispatch, useSelector, shallowEqual, ReactReduxContext } from 'react-redux';
import { store } from '@/redux/store/store';
import {
  IFilters,
  ReceiveFilter,
  ReceivePokemonByFilterAction,
  ReceiveSelectPokemonAction,
  RequestFilter,
  RequestPokemonAction,
  RequestPokemonByFilterAction,
  RequestSelectPokemonAction,
  SetFilterAction,
  SetPokemonAction,
  SignIn,
  SignOut,
} from '../store/type';

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
    const actionGet: RequestPokemonAction = {
      type: actionTypes.REQUEST_POKEMON_LIST,
    };
    dispatch(actionGet);
    const offset = store.getState().pokemons.nextPage;
    console.log('offset', offset);
    let response = await getPokedexOffsetApi(offset);
    let pokemons: any = await response.json();
    const action: SetPokemonAction = {
      type: actionTypes.RECEIVE_POKEMON_LIST,
      pokemons: pokemons.results,
    };
    dispatch(action, pokemons);
  };
}
export function selectPokemon(pokedex_id: number) {
  return async (dispatch: Dispatch<any>) => {
    const actionReceive: RequestSelectPokemonAction = {
      type: actionTypes.REQUEST_SELECT_POKEMON,
      pokedex_id,
    };
    dispatch(actionReceive);
    let response = await getPokemonApi(pokedex_id);
    let pokemon: any = await response.json();
    let responseSpecies = await getDetailsPokemonApi(pokedex_id);
    let pokemonSpecies: any = await responseSpecies.json();
    let flavor_text = pokemonSpecies.flavor_text_entries.filter((entries: any) => {
      return entries.language.name == 'en';
    });
    const action: ReceiveSelectPokemonAction = {
      type: actionTypes.RECEIVE_SELECT_POKEMON,
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
  };
}

export function setFilter(filter: IFilters) {
  return (dispatch: Dispatch<any>) => {
    console.log(filter);
    const action: SetFilterAction = {
      type: actionTypes.SET_FILTER,
      filter,
    };
    dispatch(action);
    getPokemonByFilter(filter)(dispatch);
  };
}

export function getPokemonByFilter(filter: IFilters) {
  return async (dispatch: Dispatch<any>) => {
    const actionGet: RequestPokemonByFilterAction = {
      type: actionTypes.REQUEST_POKEMON_BY_FILTER,
    };
    dispatch(actionGet);
    let form: any;
    let type: any;
    if (filter.form) {
      let responseForm = await getPokemonByFormApi(filter.form);
      form = await responseForm.json();
    }
    if (filter.type) {
      let responseType = await getPokemonByTypeApi(filter.type);
      type = await responseType.json();
    }
    if (form && type) {
      // regroupe les pokemons aec les deux critères
      let typeList = type.pokemon.map((pokemon: any) => {
        return pokemon.pokemon;
      });
      console.log(typeList, form.pokemon_species);
      // const map2 = new Map(typeList.map((x: any, index: number) => [index, x.name]));
      // console.log(map2);
      // const pokemons = form.pokemon_species.filter((a1: any) => map2.has(a1.name));
      const pokemons = form.pokemon_species.filter((o: any) =>
        typeList.some(({ name }: { name: string }) => o.name === name),
      );
      // console.log('intersection:', intersect);
      const action: ReceivePokemonByFilterAction = {
        type: actionTypes.RECEIVE_POKEMON_BY_FILTER,
        pokemons: pokemons,
      };
      dispatch(action, pokemons);
    }
  };
}

export function getFilters() {
  return async (dispatch: Dispatch<any>) => {
    const action: RequestFilter = {
      type: actionTypes.REQUEST_FILTERS_ELEMENTS,
    };
    dispatch(action);
    let responseForm = await getPokemonByFormApi();
    let filtersForm: any = await responseForm.json();
    let responseType = await getPokemonByTypeApi();
    let filtersType: any = await responseType.json();
    const actionReceive: ReceiveFilter = {
      type: actionTypes.RECEIVE_FILTERS_ELEMENTS,
      filters: { forms: filtersForm.results, types: filtersType.results },
    };
    dispatch(actionReceive);
  };
}
