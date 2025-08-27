import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';

type itemType = {
  pokemon: IPokemon;
  select: (id: number) => void;
};
export default function Item({ pokemon, select }: itemType) {
  // const [selectedPokemon, setSelectedPokemon] = useState(0);
  const selectedPokemon: IPokemon | null = useSelector(
    (state: PokemonState) => state.selectedPokemon,
  );

  function setSelection(id: number) {
    // setSelectedPokemon(id);
    // console.log('id pokemon', id);
    select(id);
  }

  return (
    // <View style={styles.container}>
    <TouchableOpacity
      style={[
        styles.container,
        selectedPokemon &&
          selectedPokemon.pokedex_id == pokemon.pokedex_id && { backgroundColor: '#4c752c' },
      ]}
      activeOpacity={1}
      onPress={() => setSelection(pokemon.pokedex_id)}
    >
      <Text style={styles.text}>
        {pokemon.pokedex_id} {pokemon.name['fr']}
      </Text>
      <View
        style={[
          styles.trangleShape,
          selectedPokemon &&
            selectedPokemon.pokedex_id == pokemon.pokedex_id && { borderTopColor: '#4c752c' },
        ]}
      ></View>
    </TouchableOpacity>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: 35,
    alignSelf: 'center',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2f2f2f',
    marginBottom: 5,
  },
  text: {
    color: 'white',
  },
  trangleShape: {
    width: 0,
    height: 0,
    position: 'absolute',
    left: '99.8%',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 20,
    borderTopWidth: 35,
    borderRightColor: 'transparent',
    borderTopColor: '#2f2f2f',
  },
});
