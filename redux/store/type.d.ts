// something.d.ts -> le .d permet de crée des définitions, qui rend les type dispo partout dans le projet !

interface IPokemon {
  id: number;
  name: string;
  description: string;
}

type PokemonState = {
  pokemons: IPokemon[];
};

type PokemonAction = {
  type: string;
  pokemon: IPokemon;
};

type DispatchType = (args: PokemonAction) => PokemonAction;
