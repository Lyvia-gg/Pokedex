import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native';
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
  const dispatch: Dispatch<any> = useDispatch();
  const pokemons: readonly IPokemonList[] = useSelector(
    (state: PokemonState) => state.pokemons.pokemonList,
    shallowEqual,
  );
  const filters: IFilters | null = useSelector(
    (state: PokemonState) => state.pokemons.filters,
    shallowEqual,
  );

  const handleScroll = () => {
    if (filters == null) {
      dispatch(getPokedex());
    }
  };

  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      style={[styles.list, style]}
      onEndReachedThreshold={0.1}
      onEndReached={handleScroll}
      data={pokemons}
      ListFooterComponent={
        <View style={[styles.listFooterComponent]}>
          <ActivityIndicator
            style={filters != null ? { display: 'none' } : {}}
            size="large"
            color="#000"
          />
          <Text
            style={[
              filters == null || pokemons.length != 0 ? { display: 'none' } : {},
              styles.text,
            ]}
          >
            No pokemons found
          </Text>
        </View>
      }
      renderItem={({ item, index }) => (
        <Item
          key={index}
          select={() => {
            let idSelect = item.url.split('/')[6];
            selectPokemon(parseInt(idSelect));
          }}
          pokemonList={{
            ...item,
            pokedex_id: parseInt(item.url.split('/')[6]),
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
  listFooterComponent: { paddingBottom: 20, justifyContent: 'center', alignItems: 'center' },
  text: {
    fontFamily: 'retroGaming',
  },
});
