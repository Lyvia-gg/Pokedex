import * as actionTypes from '@/redux/store/actionTypes';

const initialState: PokemonState = {
  pokemons: [],
};

const reducer = (state: PokemonState = initialState, action: GetPokemonAction): PokemonState => {
  switch (action.type) {
    case actionTypes.GET_POKEMON:
      state = { ...state, pokemons: action.pokemons };
    // console.log('reducer !', action.pokemons);
    // case actionTypes.REMOVE_POKEMON:
    //   const updatedPokemons: IPokemon[] = state.pokemons.filter(
    //     (pokemon) => pokemon.id !== action.pokemon.id,
    //   );
    //   return {
    //     ...state,
    //     pokemons: updatedPokemons,
    //   };
  }

  return state;
};

export default reducer;
