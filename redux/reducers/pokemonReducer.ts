import * as actionTypes from '@/redux/store/actionTypes';

const initialState: PokemonState = {
  pokemons: [
    {
      id: 1,
      name: 'Pikachu',
      description: 'pokemon éléctrique',
    },
    {
      id: 2,
      name: 'Osselait',
      description: 'Pokémon crane',
    },
  ],
};

const reducer = (state: PokemonState = initialState, action: PokemonAction): PokemonState => {
  switch (action.type) {
    case actionTypes.ADD_POKEMON:
      const newPokemon: IPokemon = {
        id: Math.random(), // not really unique
        name: action.pokemon.name,
        description: action.pokemon.description,
      };
      return {
        ...state,
        pokemons: state.pokemons.concat(newPokemon),
      };
    case actionTypes.REMOVE_POKEMON:
      const updatedPokemons: IPokemon[] = state.pokemons.filter(
        (pokemon) => pokemon.id !== action.pokemon.id,
      );
      return {
        ...state,
        pokemons: updatedPokemons,
      };
  }
  return state;
};

export default reducer;
