import { Dispatch } from '@reduxjs/toolkit';
import * as actionTypes from '@/redux/store/actionTypes';
import {
  getDetailsPokemonApi,
  getPokedexOffsetApi,
  getPokemonApi,
  getPokemonByFormApi,
  getPokemonByTypeApi,
} from '@/constants/api';
import { store } from '@/redux/store/store';
import {
  IFilters,
  IPokemon,
  IPokemonList,
  ReceiveFilter,
  ReceivePokemonByFilterAction,
  ReceiveSelectPokemonAction,
  RequestFilter,
  RequestPokemonAction,
  RequestPokemonByFilterAction,
  RequestSelectPokemonAction,
  SetFilterAction,
  SetPokemonAction,
  SetPokemonResetAction,
  SignIn,
  SignOut,
  textFilterEnum,
} from '../store/type';

type receivePokemon = {
  name: string;
  url: string;
};
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
    if (!store.getState().pokemons.isLoading) {
      const actionGet: RequestPokemonAction = {
        type: actionTypes.REQUEST_POKEMON_LIST,
      };
      dispatch(actionGet);
      const offset = store.getState().pokemons.nextPage;
      let response = await getPokedexOffsetApi(offset);
      let pokemons: any = await response.json();
      const action: SetPokemonAction = {
        type: actionTypes.RECEIVE_POKEMON_LIST,
        pokemons: pokemons.results,
      };
      dispatch(action, pokemons);
    }
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
    let name: string = pokemon.name;
    let id: number = pokemon.id;
    if (responseSpecies.status === 404) {
      responseSpecies = await getDetailsPokemonApi(pokemon.species.url.split('/')[6]);
    }
    let pokemonSpecies: any = await responseSpecies.json();
    let flavor_text = pokemonSpecies.flavor_text_entries.filter((entries: any) => {
      return entries.language.name == 'en';
    });
    const action: ReceiveSelectPokemonAction = {
      type: actionTypes.RECEIVE_SELECT_POKEMON,
      selectedPokemon: {
        name: name,
        pokedex_id: id,
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
    const action: SetFilterAction = {
      type: actionTypes.SET_FILTER,
      filter:
        filter.form == null && filter.type == null && filter.searchingValue == null ? null : filter,
    };
    dispatch(action);
    applyFilter(
      filter.form == null && filter.type == null && filter.searchingValue == null ? null : filter,
    )(dispatch);
  };
}

function resetPokemonList() {
  return async (dispatch: Dispatch<any>) => {
    let response = await getPokedexOffsetApi(0);
    let pokemons: any = await response.json();
    const action: SetPokemonResetAction = {
      type: actionTypes.RECEIVE_POKEMON_LIST_RESET,
      pokemons: pokemons.results,
    };
    dispatch(action, pokemons);
  };
}

const getPokemonByFormAndType = ({ form, type }: { form: any; type: any }) => {
  let typeList = type.pokemon.map((pokemon: any) => {
    return pokemon.pokemon;
  });
  const pokemons = form.pokemon_species.filter((o: any) =>
    typeList.some(({ name }: { name: string }) => o.name === name),
  );
  pokemons.sort((a: receivePokemon, b: receivePokemon) => {
    const aSplited = a.url.split('/');
    const bSplited = b.url.split('/');
    const aId = parseInt(aSplited[6]);
    const bId = parseInt(bSplited[6]);
    return aId - bId;
  });
  return pokemons;
};

const getPokemonByForm = (form: any) => {
  let pokemons = form.pokemon_species.sort((a: receivePokemon, b: receivePokemon) => {
    const aSplited = a.url.split('/');
    const bSplited = b.url.split('/');
    const aId = parseInt(aSplited[6]);
    const bId = parseInt(bSplited[6]);
    return aId - bId;
  });
  return pokemons;
};

const getPokemonByType = (type: any) => {
  let typeList = type.pokemon.map((pokemon: any) => {
    return pokemon.pokemon;
  });
  let pokemons = typeList.sort((a: receivePokemon, b: receivePokemon) => {
    const aSplited = a.url.split('/');
    const bSplited = b.url.split('/');
    const aId = parseInt(aSplited[6]);
    const bId = parseInt(bSplited[6]);
    return aId - bId;
  });
  return pokemons;
};

const getPokemonsBySearch = async (
  pokemonsList: IPokemonList[] | null,
  searchingValue: { text: string; context: textFilterEnum } | null,
) => {
  let pokemons: IPokemonList[];
  if (!pokemonsList) {
    let response = await getPokedexOffsetApi(0, 2000);
    let pokemonsResponse = await response.json();
    pokemons = pokemonsResponse.results;
  } else {
    pokemons = pokemonsList;
  }
  if (searchingValue != null) {
    let pokemonListSearch = pokemons.filter((pokemon: { name: string; url: string }) => {
      if (!parseInt(searchingValue.text)) {
        switch (searchingValue.context) {
          case textFilterEnum.startWith:
            return pokemon.name.startsWith(searchingValue.text.toLowerCase());

          case textFilterEnum.endWith:
            return pokemon.name.endsWith(searchingValue.text.toLowerCase());

          case textFilterEnum.all:
            return pokemon.name.includes(searchingValue.text.toLowerCase());
        }
      } else {
        let pokedex_id = pokemon.url.split('/')[6];
        switch (searchingValue.context) {
          case textFilterEnum.startWith:
            return pokedex_id.startsWith(searchingValue.text);

          case textFilterEnum.endWith:
            return pokedex_id.endsWith(searchingValue.text);

          case textFilterEnum.all:
            return pokedex_id.includes(searchingValue.text);
        }
      }
    });
    return pokemonListSearch;
  }
  return pokemons;
};

const getPokemonByFilter = ({ form, type, searchingValue }: IFilters) => {
  return async (dispatch: Dispatch<any>) => {
    let pokemons;
    if (form && type) {
      pokemons = await getPokemonByFormAndType({ form, type });
    } else if (form) {
      pokemons = await getPokemonByForm(form);
    } else if (type) {
      pokemons = await getPokemonByType(type);
    }
    console.log(form, type);
    pokemons = await getPokemonsBySearch(pokemons, searchingValue);
    const action: ReceivePokemonByFilterAction = {
      type: actionTypes.RECEIVE_POKEMON_BY_FILTER,
      pokemons: pokemons,
    };
    dispatch(action, pokemons);
  };
};

const applyFilter = (filter: IFilters | null) => {
  return async (dispatch: Dispatch<any>) => {
    const actionGet: RequestPokemonByFilterAction = {
      type: actionTypes.REQUEST_POKEMON_BY_FILTER,
    };
    dispatch(actionGet);
    let form: any = null;
    let type: any = null;
    if (filter == null) {
      resetPokemonList()(dispatch);
    } else {
      if (filter.form) {
        let responseForm = await getPokemonByFormApi(filter.form);
        form = await responseForm.json();
      }
      if (filter.type) {
        let responseType = await getPokemonByTypeApi(filter.type);
        type = await responseType.json();
      }
      getPokemonByFilter({ form, type, searchingValue: filter.searchingValue })(dispatch);
    }
  };
};

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
