import { StyleSheet } from 'react-native';

import { useSession } from '@/context/AuthContext';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector, shallowEqual, ReactReduxContext } from 'react-redux';
import { getPokedex, selectPokemon } from '@/redux/actions/pokemonAction';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import bottomScreen from '@/components/PokemonList/List';
import Details from '@/components/PokemonDetails/Details';
import ModalFilter from '@/components/ModalFilter';
import List from '@/components/PokemonList/List';
import BottomScreen from '@/components/BottomScreen';
import BottomMenu from '@/components/BottomMenu';
import { IPokemonList, PokemonState } from '@/redux/store/type';

export default function HomeScreen() {
  const pokemons: readonly IPokemonList[] = useSelector(
    (state: PokemonState) => state.pokemons.pokemonList,
    shallowEqual,
  );

  function setSelectedPokemon(id: number) {
    dispatch(selectPokemon(id));
  }

  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    if (pokemons.length === 0) {
      dispatch(getPokedex());
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.separation}></View>
      <View style={styles.pokedex}>
        <View style={[styles.mainComponent, styles.topComponent]}>
          <View style={styles.mainScreen}>
            <Details />
          </View>
        </View>

        <View style={styles.mainComponent}>
          <BottomScreen setSelectedPokemon={setSelectedPokemon} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: '#7b7776',
  },
  mainComponent: {
    height: '50%',
    flexDirection: 'column',
    backgroundColor: '#3a3a3a',
    borderColor: '#000',
    borderWidth: 2,
    padding: 10,
    paddingTop: 45,
    width: '90%',
    position: 'relative',
  },
  topComponent: { paddingTop: 10, paddingBottom: 45, borderBottomWidth: 0 },
  mainScreen: {
    backgroundColor: '#21cc96',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    position: 'relative',
    alignItems: 'center',
    height: '100%',
    borderColor: '#000',
    borderWidth: 2,
  },
  pokedex: {
    display: 'flex',
    flex: 1,
    width: '100%',
    // justifyContent: 'space-evenly',
    // gap: 10,
    alignItems: 'center',
  },
  separation: {
    width: '100%',
    height: 5,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#000',
  },
  background: {
    width: '100%',
    position: 'absolute',
    height: '100%',
  },
  scrollView: {
    // flex: 1,
    display: 'flex',
    width: '100%',
    height: '46%',
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
    borderRadius: 10,
    // width: '30%',
  },
});
