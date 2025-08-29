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
  type: 'RECEIVE_POKEMON_LIST';
  pokemons: IPokemonList[];
}

interface SignIn {
  type: 'SIGN_IN';
  email: string;
}

interface SignOut {
  type: 'SIGN_OUT';
}

interface RequestPokemonAction {
  type: 'REQUEST_POKEMON_LIST';
}

interface RequestSelectPokemonAction {
  type: 'REQUEST_SELECT_POKEMON';
  pokedex_id: number;
}
interface ReceiveSelectPokemonAction {
  type: 'RECEIVE_SELECT_POKEMON';
  selectedPokemon: IPokemon;
}

interface IUser {
  email: string;
}

type PokemonAction =
  | RequestPokemonAction
  | RequestSelectPokemonAction
  | ReceiveSelectPokemonAction
  | SetPokemonAction
  | SignIn
  | SignOut;

type PokemonState = {
  pokemons: { isLoading: boolean; pokemonList: IPokemonList[]; nextPage: number };
  selectedPokemon: { isLoading: boolean; pokedex_id: number | null; pokemon: IPokemon | null };
  user: IUser | null;
};

type DispatchType = (args: PokemonAction) => PokemonAction;
