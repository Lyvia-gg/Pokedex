import * as actionTypes from '@/redux/store/actionTypes';

const initialState: PokemonState = {
  pokemons: [],
  selectedPokemon: null,
  loading: false,
};

const reducer = (state: PokemonState = initialState, action: PokemonAction): PokemonState => {
  switch (action.type) {
    case actionTypes.GET_POKEMON:
      return (state = { ...state, loading: true });
    // console.log('reducer !', action.pokemons);
    case actionTypes.SELECT_POKEMON:
      return (state = { ...state, selectedPokemon: action.selectedPokemon });

    case actionTypes.SET_POKEMON:
      return (state = { ...state, pokemons: action.pokemons, loading: false });
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
