import * as actionTypes from '@/redux/store/actionTypes';

const initialState: PokemonState = {
  pokemons: { isLoading: false, pokemonList: [], nextPage: 0 },
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
      return (state = {
        ...state,
        pokemons: {
          pokemonList: state.pokemons.pokemonList.concat(action.pokemons),
          isLoading: false,
          nextPage: state.pokemons.nextPage + 100,
        },
      });
    case actionTypes.SIGN_IN:
      console.log('blblbl');
      return (state = { ...state, user: { email: action.email } });
    case actionTypes.SIGN_OUT:
      console.log('pas blblbl');
      return (state = { ...state, user: null });
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
