export const getPokedexOffsetApi = async (offset: number, limit?: number): Promise<Response> => {
  if (offset != undefined) {
    limit = limit ? limit : 100;
    return fetch(process.env.EXPO_PUBLIC_API_URL + '/pokemon?limit=' + limit + '&offset=' + offset);
  }
  return fetch(process.env.EXPO_PUBLIC_API_URL + '/pokemon?limit=100&offset=0');
};

export const getPokemonApi = async (pokedex_id: number): Promise<Response> => {
  return fetch(process.env.EXPO_PUBLIC_API_URL + '/pokemon/' + pokedex_id);
};
export const getDetailsPokemonApi = async (pokedex_id: number): Promise<Response> => {
  return fetch(process.env.EXPO_PUBLIC_API_URL + '/pokemon-species/' + pokedex_id);
};

export const getPokemonByFormApi = async (form?: string): Promise<Response> => {
  //result.pokemon_species -> tout les pokemons aillant cette forme
  if (form) {
    return fetch(process.env.EXPO_PUBLIC_API_URL + '/pokemon-shape/' + form);
  }
  return fetch(process.env.EXPO_PUBLIC_API_URL + '/pokemon-shape');
};

export const getPokemonByTypeApi = async (type?: string): Promise<Response> => {
  //result.pokemon -> tout les pokemons aillant ce type
  if (type) {
    return fetch(process.env.EXPO_PUBLIC_API_URL + '/type/' + type);
  }
  return fetch(process.env.EXPO_PUBLIC_API_URL + '/type');
};
