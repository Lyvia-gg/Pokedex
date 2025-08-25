import { Image } from 'expo-image';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSession } from '@/context/AuthContext';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector, shallowEqual, ReactReduxContext } from 'react-redux';
import { getPokedexByGeneration } from '@/redux/actions/pokemonAction';
import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import List from '@/components/PokemonList/List';

// type Props = {
//   fetchPokemon: (pokemons: IPokemon | any) => void
// }

export default function HomeScreen() {
  const { signOut } = useSession();
  // const { PokemonState } = useSelector(state => state.pokemons);
  const pokemons: readonly IPokemon[] = useSelector(
    (state: PokemonState) => state.pokemons,
    shallowEqual,
  );

  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(getPokedexByGeneration(5));
    // console.log('dispatch (main)');
    // console.log('state pokemon', pokemons);
  }, []);

  return (
    // <ScrollView>
    <ScrollView style={{ flex: 1, backgroundColor: 'red', display: 'flex' }}>
      <TouchableOpacity onPress={() => signOut()} style={[styles.button]}>
        <Text>Sign out</Text>
      </TouchableOpacity>
      <List pokemons={pokemons}></List>
    </ScrollView>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
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
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    width: '30%',
  },
});
