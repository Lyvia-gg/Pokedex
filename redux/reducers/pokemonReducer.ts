import * as actionTypes from '@/redux/store/actionTypes';

const initialState: PokemonState = {
  pokemons: { isLoading: false, pokemonList: [] },
  selectedPokemon: null,
  user: null,
};

const reducer = (state: PokemonState = initialState, action: PokemonAction): PokemonState => {
  switch (action.type) {
    case actionTypes.GET_POKEMON:
      return (state = { ...state, pokemons: { ...state.pokemons, isLoading: true } });
    // console.log('reducer !', action.pokemons);
    case actionTypes.SELECT_POKEMON:
      return (state = { ...state, selectedPokemon: action.selectedPokemon });

    case actionTypes.SET_POKEMON:
      return (state = { ...state, pokemons: { pokemonList: action.pokemons, isLoading: false } });
    // case actionTypes.REMOVE_POKEMON:
    //   const updatedPokemons: IPokemon[] = state.pokemons.filter(
    //     (pokemon) => pokemon.id !== action.pokemon.id,
    //   );
    //   return {
    //     ...state,
    //     pokemons: updatedPokemons,
    //   };
    default:
      return state;
  }
};

export default reducer;
