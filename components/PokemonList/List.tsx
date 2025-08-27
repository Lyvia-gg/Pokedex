import { FlatList, StyleSheet, Text, View } from 'react-native';
import Item from './Item';
// import Paging from "";

type listType = {
  pokemons: readonly IPokemon[];
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
      keyExtractor={(item) => item.pokedex_id.toString()}
      renderItem={({ item }) => (
        <Item
          select={(id: number) => {
            // console.log(id);
            selectPokemon(id);
          }}
          pokemon={item}
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
    // justifyContent: 'center',
    width: '100%',
    flex: 1,
    // marginRight: 20,
    gap: 5,
  },
});
