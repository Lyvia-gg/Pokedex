import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getPokedex, selectPokemon, signOut } from '@/redux/actions/pokemonAction';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Details from '@/components/PokemonDetails/Details';
import BottomScreen from '@/components/BottomScreen';
import { IPokemonList, PokemonState } from '@/redux/store/type';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import PokedexButtom from '@/components/PokedexBottom';

export default function HomeScreen() {
  const pokemons: readonly IPokemonList[] = useSelector(
    (state: PokemonState) => state.pokemons.pokemonList,
    shallowEqual,
  );
  const dispatch: Dispatch<any> = useDispatch();
  const windowHeight = Dimensions.get('window').height;
  const translateBottomScreen = useSharedValue<number>(0);
  const translatePokeball = useSharedValue<number>(windowHeight / 2 + 1);

  useEffect(() => {
    if (pokemons.length === 0) {
      setTimeout(() => {
        dispatch(getPokedex());
      }, 1000);
    }
  }, []);
  const setSelectedPokemon = (id: number) => {
    dispatch(selectPokemon(id));
  };
  const animatedTranslate = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSpring(translateBottomScreen.value * 2, {
          stiffness: 900,
          damping: 120,
          mass: 4,
          overshootClamping: false,
        }),
      },
    ],
  }));
  const animatedTranslatePokeball = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSpring(translatePokeball.value * 2, {
          stiffness: 900,
          damping: 120,
          mass: 4,
          overshootClamping: false,
        }),
      },
    ],
  }));
  const onClose = () => {
    translateBottomScreen.value = -windowHeight / 4 + 1;
    translatePokeball.value = windowHeight / 4 + 1;
    setTimeout(() => {
      dispatch(signOut());
    }, 700);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, styles.containerKeyBoard]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Animated.View style={[styles.separation, animatedTranslate]}></Animated.View>
      <View style={styles.pokedex}>
        {/* topScreen */}
        <View style={[styles.mainComponent, styles.topComponent]}>
          <View style={styles.mainScreen}>
            <Details />
          </View>
        </View>
        {/* bottomScreen */}
        <Animated.View style={[styles.mainComponent, animatedTranslate]}>
          <BottomScreen onClose={onClose} setSelectedPokemon={setSelectedPokemon} />
        </Animated.View>
      </View>
      <Animated.View style={[animatedTranslatePokeball, styles.animatedPokeball]}>
        <PokedexButtom buttonDisabled={true} />
      </Animated.View>
    </KeyboardAvoidingView>
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
  containerKeyBoard: {
    alignItems: 'center',
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
  },
  animatedPokeball: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 10,
  },
});
