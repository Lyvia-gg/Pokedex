import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import Item from './Item';
import { Dispatch } from '@reduxjs/toolkit';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getPokedex } from '@/redux/actions/pokemonAction';
import { IFilters, IPokemonList, PokemonState } from '@/redux/store/type';
type ListType = {
  selectPokemon: (id: number) => void;
  style?: object;
};

export default function List({ selectPokemon, style }: ListType) {
  const pokemons: readonly IPokemonList[] = useSelector(
    (state: PokemonState) => state.pokemons.pokemonList,
    shallowEqual,
  );
  const dispatch: Dispatch<any> = useDispatch();

  const handleScroll = () => {
    // TODO ca se déclanche lorsqu'on recup les pokémons au debut.....
    console.log('dispatch !');
    dispatch(getPokedex());
  };

  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      style={[styles.list, style]}
      onEndReachedThreshold={0.1}
      onEndReached={handleScroll}
      data={pokemons}
      ListFooterComponent={
        <View
          style={[styles.listFooterComponent, pokemons.length === 0 ? { display: 'none' } : {}]}
        >
          <ActivityIndicator size="large" color="#000" />
        </View>
      }
      renderItem={({ item, index }) => (
        <Item
          key={index}
          select={() => {
            let idSelect = item.url.split('/')[item.url.split('/').length - 2];
            selectPokemon(parseInt(idSelect));
          }}
          pokemonList={{
            ...item,
            pokedex_id: parseInt(item.url.split('/')[item.url.split('/').length - 2]),
          }}
        />
      )}
    />
    //    <View style={{ width: '100%', height: 50, backgroundColor: 'red' }}>
    //     <Text>Is loading !!</Text>
    //   </View>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    gap: 5,
    paddingTop: 10,
    // paddingBottom: 20,
  },
  listFooterComponent: { paddingBottom: 20 },
});
