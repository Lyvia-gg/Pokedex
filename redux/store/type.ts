export interface ITypesPokemon {
  type: { name: string; url: string };
}
export interface IPokemon {
  name: string;
  pokedex_id: number;
  sprite: { regular: string };
  description: string;
  genera: string;
  types: ITypesPokemon[];
}

export interface IPokemonList {
  name: string;
  pokedex_id: number;
  url: string;
}

export interface SetPokemonAction {
  type: 'RECEIVE_POKEMON_LIST';
  pokemons: IPokemonList[];
}
export interface SetPokemonResetAction {
  type: 'RECEIVE_POKEMON_LIST_RESET';
  pokemons: IPokemonList[];
}

export interface SignIn {
  type: 'SIGN_IN';
  email: string;
}

export interface SignOut {
  type: 'SIGN_OUT';
}

export interface RequestPokemonAction {
  type: 'REQUEST_POKEMON_LIST';
}

export interface RequestSelectPokemonAction {
  type: 'REQUEST_SELECT_POKEMON';
  pokedex_id: number;
}
export interface ReceiveSelectPokemonAction {
  type: 'RECEIVE_SELECT_POKEMON';
  selectedPokemon: IPokemon;
}

export interface RequestFilter {
  type: 'REQUEST_FILTERS_ELEMENTS';
}
export interface ReceiveFilter {
  type: 'RECEIVE_FILTERS_ELEMENTS';
  filters: IFiltersList;
}

export interface IFilters {
  type: string | null;
  form: string | null;
  searchingName: string | null;
}

export interface SetFilterAction {
  type: 'SET_FILTER';
  filter: IFilters | null;
}
export interface IFiltersList {
  types: [];
  forms: [];
}

export interface RequestPokemonByFilterAction {
  type: 'REQUEST_POKEMON_BY_FILTER';
}

export interface ReceivePokemonByFilterAction {
  type: 'RECEIVE_POKEMON_BY_FILTER';
  pokemons: IPokemonList[];
}

export interface IUser {
  email: string;
}

export type PokemonAction =
  | RequestPokemonAction
  | RequestSelectPokemonAction
  | ReceiveSelectPokemonAction
  | SetPokemonAction
  | SignIn
  | RequestFilter
  | ReceiveFilter
  | SetFilterAction
  | RequestPokemonByFilterAction
  | ReceivePokemonByFilterAction
  | SetPokemonResetAction
  | SignOut;

export type PokemonState = {
  pokemons: {
    isLoading: boolean;
    pokemonList: IPokemonList[];
    nextPage: number;
    filters: IFiltersList | null;
  };
  selectedPokemon: { isLoading: boolean; pokedex_id: number | null; pokemon: IPokemon | null };
  user: IUser | null;
  filters: { isLoading: boolean; filterList: IFiltersList | null; filter: IFilters | null };
};

export type DispatchType = (args: PokemonAction) => PokemonAction;
