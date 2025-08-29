import {
  ScrollView,
  NativeScrollEvent,
  PointProp,
  StyleSheet,
  Text,
  View,
  NativeSyntheticEvent,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Item from './Item';
import { Dispatch } from '@reduxjs/toolkit';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getPokedex } from '@/redux/actions/pokemonAction';
import { useEffect, useState } from 'react';
// import Paging from "";
// import {NativeScrollEvent} from "@CoreEventTypes"
type listType = {
  // pokemons: readonly IPokemonList[];
  selectPokemon: (id: number) => void;
  // selectedPokemon: number;
};

export default function List({ selectPokemon }: listType) {
  const loading: boolean = useSelector(
    (state: PokemonState) => state.pokemons.isLoading,
    shallowEqual,
  );
  const pokemons: readonly IPokemonList[] = useSelector(
    (state: PokemonState) => state.pokemons.pokemonList,
    shallowEqual,
  );
  // const [scrollToEnd, setScrollToEnd] = useState(false);
  //   console.log(pokemons);
  const dispatch: Dispatch<any> = useDispatch();

  // const isCloseToBottom = ({
  //   layoutMeasurement,
  //   contentOffset,
  //   contentSize,
  // }: NativeScrollEvent) => {
  //   console.log(layoutMeasurement.height + contentOffset.y >= contentSize.height - 10);
  //   return layoutMeasurement.height + contentOffset.y >= contentSize.height - 10;
  // };

  const handleScroll = () => {
    console.log('dispatch !');
    dispatch(getPokedex());
  };

  return (
    <FlatList
      // contentOffset={scrollPosition}
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      style={styles.list}
      onEndReachedThreshold={0.1}
      onEndReached={handleScroll}
      data={pokemons}
      ListFooterComponent={
        <View>
          <ActivityIndicator size="large" color="#000" />
        </View>
      }
      renderItem={({ item, index }) => (
        <Item
          key={index}
          select={(id: number) => {
            // console.log(id);
            selectPokemon(id);
          }}
          pokemonList={{ ...item, pokedex_id: index + 1 }}
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
  },
});
