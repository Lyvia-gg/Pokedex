import { ScrollView, NativeScrollEvent, PointProp, StyleSheet, Text, View } from 'react-native';
import Item from './Item';
import { Dispatch } from '@reduxjs/toolkit';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getPokedex } from '@/redux/actions/pokemonAction';
import { useState } from 'react';
// import Paging from "";

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
  //   console.log(pokemons);
  const dispatch: Dispatch<any> = useDispatch();

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height;
  };

  return (
    <ScrollView
      // contentOffset={scrollPosition}
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      style={styles.list}
      // data={pokemons}
      //   onEndReached={() => fetchMoreData()}
      // keyExtractor={(item, index) => index.toString()}
      // onScrollEndDrag={(nativeEvent) => handleScroll(nativeEvent)}
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent) && !loading) {
          setTimeout(() => {
            console.log('this is the end');
            dispatch(getPokedex());
          }, 800);
        }
      }}
      scrollEventThrottle={0}
      // renderItem={({ item, index }) => (
      //   <Item
      //     select={(id: number) => {
      //       // console.log(id);
      //       selectPokemon(id);
      //     }}
      //     pokemonList={{ ...item, pokedex_id: index + 1 }}
      //   />
      // )}
    >
      {pokemons.map((pokemon, i) => {
        return (
          <Item
            key={i}
            select={(id: number) => {
              // console.log(id);
              selectPokemon(id);
            }}
            pokemonList={{ ...pokemon, pokedex_id: i + 1 }}
          />
        );
      })}
      {loading && (
        <View style={{ width: '100%', height: 50, backgroundColor: 'red' }}>
          <Text>Is loading !!</Text>
        </View>
      )}
    </ScrollView>

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
