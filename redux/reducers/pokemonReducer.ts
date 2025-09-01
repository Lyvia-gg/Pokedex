import * as actionTypes from '@/redux/store/actionTypes';
import { PokemonAction, PokemonState } from '@/redux/store/type';
const initialState: PokemonState = {
  pokemons: { isLoading: false, pokemonList: [], nextPage: 0, filters: null },
  selectedPokemon: { isLoading: false, pokedex_id: null, pokemon: null },
  user: null,
  filters: { isLoading: false, filterList: null, filter: null },
};

const reducer = (state: PokemonState = initialState, action: PokemonAction): PokemonState => {
  switch (action.type) {
    case actionTypes.REQUEST_POKEMON_LIST:
      return (state = { ...state, pokemons: { ...state.pokemons, isLoading: true } });
    case actionTypes.REQUEST_SELECT_POKEMON:
      return (state = {
        ...state,
        selectedPokemon: {
          ...state.selectedPokemon,
          pokedex_id: action.pokedex_id,
          isLoading: true,
        },
      });
    case actionTypes.RECEIVE_SELECT_POKEMON:
      return (state = {
        ...state,
        selectedPokemon: {
          ...state.selectedPokemon,
          pokemon: action.selectedPokemon,
          isLoading: false,
        },
      });
    case actionTypes.RECEIVE_POKEMON_LIST:
      return (state = {
        ...state,
        pokemons: {
          ...state.pokemons,
          pokemonList: state.pokemons.pokemonList.concat(action.pokemons),
          isLoading: false,
          nextPage: state.pokemons.nextPage + 100,
        },
      });
    case actionTypes.SIGN_IN:
      return (state = { ...state, user: { email: action.email } });
    case actionTypes.SIGN_OUT:
      return (state = { ...state, user: null });
    case actionTypes.REQUEST_FILTERS_ELEMENTS:
      return (state = { ...state, filters: { ...state.filters, isLoading: true } });
    case actionTypes.RECEIVE_FILTERS_ELEMENTS:
      return (state = {
        ...state,
        filters: { ...state.filters, isLoading: false, filterList: action.filters },
      });
    case actionTypes.SET_FILTER:
      return (state = { ...state, filters: { ...state.filters, filter: action.filter } });
    case actionTypes.REQUEST_POKEMON_BY_FILTER:
      return (state = { ...state, pokemons: { ...state.pokemons, isLoading: true } });
    case actionTypes.RECEIVE_POKEMON_BY_FILTER:
      return (state = {
        ...state,
        pokemons: { ...state.pokemons, isLoading: false, pokemonList: action.pokemons },
      });
    default:
      return state;
  }
};

export default reducer;
