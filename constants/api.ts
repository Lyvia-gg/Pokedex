export const getPokedexByGenerationApi = async (genName: number): Promise<Response> => {
  return fetch('https://tyradex.app/api/v1/gen/' + genName);
};
