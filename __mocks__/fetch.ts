export function fetchMock() {
  (global.fetch as jest.Mock) = jest.fn((url: string) => {
    if (url.includes('pokemon/')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({
          ok: true,
          status: 200,
          name: 'pikachu',
          url: 'https://pokeapi.co/api/v2/pokemon/143/',
          species: {
            url: 'https://pokeapi.co/api/v2/pokemon-species/143/',
          },
          sprites: {
            front_default: 'https://pokeapi.co/media/sprites/pokemon/other/official-artwork/4.png',
            back_default: 'https://pokeapi.co/media/sprites/pokemon/other/official-artwork/4.png',
          },
          flavor_text_entries: [
            {
              flavor_text: 'Pikachu, a Mouse Pokémon.',
              language: {
                name: 'en',
                url: 'https://pokeapi.co/api/v2/language/9/',
              },
            },
          ],
        }),
      } as Response);
    }
    if (url.includes('pokemon-species/')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({
          ok: true,
          status: 200,
          name: 'pikachu',
          url: 'https://pokeapi.co/api/v2/pokemon/143/',
          species: {
            url: 'https://pokeapi.co/api/v2/pokemon-species/143/',
          },
          genera: [
            {
              genus: 'Mouse Pokémon',
              language: {
                name: 'en',
                url: 'https://pokeapi.co/api/v2/language/9/',
              },
            },
            {
              genus: 'Mouse Pokémon',
              language: {
                name: 'en',
                url: 'https://pokeapi.co/api/v2/language/9/',
              },
            },
            {
              genus: 'Mouse Pokémon',
              language: {
                name: 'en',
                url: 'https://pokeapi.co/api/v2/language/9/',
              },
            },
            {
              genus: 'Mouse Pokémon',
              language: {
                name: 'en',
                url: 'https://pokeapi.co/api/v2/language/9/',
              },
            },
            {
              genus: 'Mouse Pokémon',
              language: {
                name: 'en',
                url: 'https://pokeapi.co/api/v2/language/9/',
              },
            },
            {
              genus: 'Mouse Pokémon',
              language: {
                name: 'en',
                url: 'https://pokeapi.co/api/v2/language/9/',
              },
            },
            {
              genus: 'Mouse Pokémon',
              language: {
                name: 'en',
                url: 'https://pokeapi.co/api/v2/language/9/',
              },
            },
          ],
          flavor_text_entries: [
            {
              flavor_text: 'Pikachu, a Mouse Pokémon.',
              language: {
                name: 'en',
                url: 'https://pokeapi.co/api/v2/language/9/',
              },
            },
          ],
        }),
      } as Response);
    }
    if (url.includes('pokemon?')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({
          ok: true,
          status: 200,
          pokemons: [
            {
              name: 'pikachu',
              url: 'https://pokeapi.co/api/v2/pokemon/143/',
            },
            {
              name: 'salamèche',
              url: 'https://pokeapi.co/api/v2/pokemon/144/',
            },
            {
              name: 'bulbasaur',
              url: 'https://pokeapi.co/api/v2/pokemon/145/',
            },
          ],
        }),
      } as Response);
    }
    if (url.includes('pokemon-shape/')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({
          ok: true,
          status: 200,
          name: 'ball',
          url: 'https://pokeapi.co/api/v2/pokemon-shape/1/',
          pokemon_species: [
            {
              name: 'pikachu',
              url: 'https://pokeapi.co/api/v2/pokemon/143/',
            },
            {
              name: 'salamèche',
              url: 'https://pokeapi.co/api/v2/pokemon/144/',
            },
            {
              name: 'bulbasaur',
              url: 'https://pokeapi.co/api/v2/pokemon/145/',
            },
          ],
        }),
      } as Response);
    }
    if (url.includes('pokemon-shape')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({
          ok: true,
          status: 200,
          results: [
            {
              name: 'ball',
              url: 'https://pokeapi.co/api/v2/pokemon-shape/1/',
            },
            {
              name: 'squiggle',
              url: 'https://pokeapi.co/api/v2/pokemon-shape/1/',
            },
            {
              name: 'fish',
              url: 'https://pokeapi.co/api/v2/pokemon-shape/1/',
            },
          ],
        }),
      } as Response);
    }
    if (url.includes('type/')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({
          ok: true,
          status: 200,
          name: 'ball',
          url: 'https://pokeapi.co/api/v2/pokemon-shape/1/',
          pokemon: [
            {
              pokemon: {
                name: 'pikachu',
                url: 'https://pokeapi.co/api/v2/pokemon/143/',
              },
              slot: 1,
            },
            {
              pokemon: {
                name: 'salamèche',
                url: 'https://pokeapi.co/api/v2/pokemon/144/',
              },
              slot: 1,
            },
            {
              pokemon: {
                name: 'bulbasaur',
                url: 'https://pokeapi.co/api/v2/pokemon/145/',
              },
              slot: 1,
            },
          ],
        }),
      } as Response);
    }
    if (url.includes('type')) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({
          ok: true,
          status: 200,
          results: [
            {
              name: 'normal',
              url: 'https://pokeapi.co/api/v2/type/1/',
            },
            {
              name: 'flying',
              url: 'https://pokeapi.co/api/v2/type/1/',
            },
            {
              name: 'fighting',
              url: 'https://pokeapi.co/api/v2/type/1/',
            },
          ],
        }),
      } as Response);
    }

    return Promise.resolve({
      ok: false,
      status: 404,
      json: async () => ({
        ok: false,
        status: 404,
        message: 'Not Found',
      }),
    });
  });
}
