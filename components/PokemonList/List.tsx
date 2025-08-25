import { FlatList, StyleSheet, Text, View } from 'react-native';
import Item from './Item';
// import Paging from "";

type pokemonList = {
  pokemons: readonly IPokemon[];
};

export default function List({ pokemons }: pokemonList) {
  //   console.log(pokemons);

  return (
    <FlatList
      style={styles.list}
      data={pokemons}
      //   onEndReached={() => fetchMoreData()}
      keyExtractor={(item) => item.pokedex_id.toString()}
      renderItem={({ item }) => <Item pokemon={item} />}
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
    gap: 5,
  },
});
