import { FlatList, StyleSheet, Text, View } from 'react-native';
import Item from './Item';
// import Paging from "";

type listType = {
  pokemons: readonly IPokemonList[];
  selectPokemon: (id: number) => void;
  // selectedPokemon: number;
};

export default function List({ pokemons, selectPokemon }: listType) {
  //   console.log(pokemons);

  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      style={styles.list}
      data={pokemons}
      //   onEndReached={() => fetchMoreData()}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <Item
          select={(id: number) => {
            // console.log(id);
            selectPokemon(id);
          }}
          pokemonList={{ ...item, pokedex_id: index + 1 }}
        />
      )}
    />

    // npm i --save react-native-swiper@next
    // <Swiper style={styles.list} horizontal={false} showsButtons={false} loop={true}>
    //   {pokemons.map((pokemon: IPokemon) => {
    //     return <Item key={pokemon.pokedex_id} pokemon={pokemon} />;
    //   })}
    // </Swiper>
  );
}

const styles = StyleSheet.create({
  list: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    gap: 5,
  },
});
