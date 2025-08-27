import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function Details() {
  const selectedPokemon: IPokemon | null = useSelector(
    (state: PokemonState) => state.selectedPokemon,
  );
  if (selectedPokemon)
    return (
      <View style={styles.container}>
        <View style={[styles.view, styles.topView]}>
          <View style={styles.pokemonView}>
            <Image source={selectedPokemon.sprites.regular} style={styles.pokemonImg}></Image>
          </View>
          <View style={styles.description}>
            <Text>{selectedPokemon.name.fr}</Text>
            <Text>{selectedPokemon.category}</Text>
          </View>
        </View>
        <View style={styles.view}>
          {/* {selectedPokemon && (
          <Image source={selectedPokemon.sprites.regular} style={styles.pokemonImg}></Image>
        )} */}
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    gap: 5,
    width: '100%',
  },
  view: {
    display: 'flex',
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  topView: {
    flexDirection: 'row',
    backgroundColor: 'red',
    flex: 1,
    gap: 5,
  },
  description: {
    backgroundColor: 'white',
    padding: 10,
    width: '50%',
    display: 'flex',
    alignItems: 'center',
  },
  pokemonView: {
    //  backgroundColor: 'white',
    padding: 10,
    width: '45%',
  },
  pokemonImg: {
    width: 100,
    height: 100,
  },
});
