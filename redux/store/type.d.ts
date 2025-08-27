// something.d.ts -> le .d permet de crée des définitions, qui rend les type dispo partout dans le projet !

interface IPokemon {
  pokedex_id: number;
  generation: number;
  category: string;
  name: {
    fr: string;
    en: string;
    jp: string;
  };
  sprites: { regular: string; shiny: string };
  talents: object;
  types: object;
  stats: object;
  resistances: object;
  evolution: object;
  next: object;
  mega: any;
  height: string;
  weight: string;
  egg_groups: object;
  sexe: object;
  catch_rate: number;
  level_100: number;
  formes: string;
}

interface SetPokemonAction {
  type: 'SET_POKEMON';
  pokemons: IPokemon[];
}

interface GetPokemonAction {
  type: 'GET_POKEMON';
}

interface SelectPokemonAction {
  type: 'SELECT_POKEMON';
  selectedPokemon: IPokemon;
}

type PokemonAction = GetPokemonAction | SelectPokemonAction | SetPokemonAction;

type PokemonState = {
  pokemons: IPokemon[];
  selectedPokemon: IPokemon | null;
  loading: bool;
};

type DispatchType = (args: PokemonAction) => PokemonAction;
