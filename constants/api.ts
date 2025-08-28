import { API_URL } from '@env';

export const getPokedexOffsetApi = async (offset: number): Promise<Response> => {
  // return fetch('https://pokeapi.co/api/v2/' + genName);
  if (offset) {
    return fetch(API_URL + '/pokemon?limit=100&offset=' + offset);
  }
  return fetch(API_URL + '/pokemon?limit=100&offset=0');
};

export const getPokemonApi = async (pokedex_id: number): Promise<Response> => {
  return fetch(API_URL + '/pokemon/' + pokedex_id);
};
export const getDetailsPokemonApi = async (pokedex_id: number): Promise<Response> => {
  return fetch(API_URL + '/pokemon-species/' + pokedex_id);
};

export const getPokemonByFormApi = async (form: string): Promise<Response> => {
  //result.pokemon_species -> tout les pokemons aillant cette forme
  return fetch(API_URL + '/pokemon-shape/' + form);
};

export const getPokemonByTypeApi = async (type: string): Promise<Response> => {
  //result.pokemon -> tout les pokemons aillant ce type
  return fetch(API_URL + '/type/' + type);
};
