import { IPokemonList, PokemonState } from '@/redux/store/type';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

type itemType = {
  pokemonList: IPokemonList;
  select: (id: number) => void;
};
export default function Item({ pokemonList, select }: itemType) {
  const selectedPokemon: number | null = useSelector(
    (state: PokemonState) => state.selectedPokemon.pokedex_id,
  );
  const setSelection = (id: number) => {
    select(id);
  };
  const url = require('@/assets/images/icon.png');

  return (
    <View style={[styles.container, { position: 'relative', backgroundColor: '' }]}>
      <TouchableOpacity
        style={[
          styles.button,
          selectedPokemon == pokemonList.pokedex_id && { backgroundColor: '#4c752c' },
        ]}
        activeOpacity={1}
        onPress={() => setSelection(pokemonList.pokedex_id)}
      >
        <Image style={styles.img} source={url} />
        <Text numberOfLines={1} style={[styles.text, { fontFamily: 'retroGaming' }]}>
          {pokemonList.pokedex_id} - {pokemonList.name}
        </Text>
      </TouchableOpacity>
      <View
        style={[
          styles.trangleShape,
          selectedPokemon == pokemonList.pokedex_id && { borderTopColor: '#4c752c' },
        ]}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: 35,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 5,
  },
  button: {
    width: '100%',
    height: 35,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#2f2f2f',
    paddingHorizontal: 10,
    position: 'static',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  text: {
    marginRight: 5,
    color: 'white',
    height: '50%',
    width: '90%',
    textTransform: 'capitalize',
  },
  trangleShape: {
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 20,
    borderTopWidth: 35,
    borderRightColor: 'transparent',
    borderTopColor: '#2f2f2f',
  },
  img: {
    width: 30,
    height: 30,
  },
});
