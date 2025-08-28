// something.d.ts -> le .d permet de crée des définitions, qui rend les type dispo partout dans le projet !

// interface IPokemon {
//   pokedex_id: number;
//   generation: number;
//   category: string;
//   name: {
//     fr: string;
//     en: string;
//     jp: string;
//   };
//   sprites: { regular: string; shiny: string };
//   talents: object;
//   types: object;
//   stats: object;
//   resistances: object;
//   evolution: object;
//   next: object;
//   mega: any;
//   height: string;
//   weight: string;
//   egg_groups: object;
//   sexe: object;
//   catch_rate: number;
//   level_100: number;
//   formes: string;
// }
interface ITypesPokemon {
  type: { name: string; url: string };
}
interface IPokemon {
  name: string;
  pokedex_id: number;
  sprite: { regular: string };
  description: string;
  genera: string;
  types: ITypesPokemon[];
}

interface IPokemonList {
  name: string;
  pokedex_id: number;
  url: string;
}

interface SetPokemonAction {
  type: 'SET_POKEMON';
  pokemons: IPokemonList[];
}

interface GetPokemonAction {
  type: 'GET_POKEMON';
}

interface SelectPokemonAction {
  type: 'SELECT_POKEMON';
  selectedPokemon: IPokemon;
}

interface IUser {
  email: string;
}

type PokemonAction = GetPokemonAction | SelectPokemonAction | SetPokemonAction;

type PokemonState = {
  pokemons: { isLoading: boolean; pokemonList: IPokemonList[] };
  selectedPokemon: IPokemon | null;
  user: IUser | null;
};

type DispatchType = (args: PokemonAction) => PokemonAction;
