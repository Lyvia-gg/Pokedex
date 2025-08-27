import { Image } from 'expo-image';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSession } from '@/context/AuthContext';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector, shallowEqual, ReactReduxContext } from 'react-redux';
import { getPokedexByGeneration, selectPokemon } from '@/redux/actions/pokemonAction';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import List from '@/components/PokemonList/List';
import { store } from '@/redux/store/store';
import Details from '@/components/PokemonDetails/Details';

// type Props = {
//   fetchPokemon: (pokemons: IPokemon | any) => void
// }

export default function HomeScreen() {
  const { signOut, getSession } = useSession();
  // const [selectedPokemon, setSelectedPokemon] = useState(0);
  // const { PokemonState } = useSelector(state => state.pokemons);
  // const pokemons: readonly IPokemon[] = useSelector(
  //   (state: PokemonState) => state.pokemons,
  //   shallowEqual,
  // );
  const pokemons: readonly IPokemon[] = useSelector(
    (state: PokemonState) => state.pokemons,
    shallowEqual,
  );
  const loading: boolean = useSelector((state: PokemonState) => state.loading, shallowEqual);

  function setSelectedPokemon(id: number) {
    // console.log('index id', id);
    dispatch(selectPokemon(id));
  }

  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(getPokedexByGeneration(5));
    getSession();
    // console.log('dispatch (main)');
    // console.log('state pokemon', pokemons);
  }, []);

  return (
    // <ScrollView>
    <View style={styles.container}>
      <TouchableOpacity onPress={() => signOut()} style={[styles.button]}>
        <Text>Sign out</Text>
      </TouchableOpacity>
      <View style={styles.scrollView}>
        <Details></Details>
      </View>
      <View style={styles.scrollView}>
        {!loading && pokemons.length > 0 && (
          <List
            pokemons={pokemons}
            // selectedPokemon={selectedPokemon}
            selectPokemon={setSelectedPokemon}
          ></List>
        )}
      </View>
    </View>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#21cc96',
  },
  scrollView: {
    // flex: 1,
    display: 'flex',
    width: '100%',
    height: '45%',
    // width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  button: {
    backgroundColor: '#DB1778',
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    width: '25%',
  },
});
