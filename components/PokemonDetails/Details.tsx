import { IPokemon, PokemonState } from '@/redux/store/type';
import { Image } from 'expo-image';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function Details() {
  const selectedPokemon: IPokemon | null = useSelector(
    (state: PokemonState) => state.selectedPokemon.pokemon,
  );
  const isLoading: boolean = useSelector((state: PokemonState) => state.selectedPokemon.isLoading);
  if (selectedPokemon && !isLoading)
    return (
      <View style={styles.container}>
        <View style={[styles.view, styles.topView]}>
          <Image
            source={selectedPokemon.sprite.regular}
            style={styles.pokemonImg}
            contentFit="contain"
          ></Image>
          <View style={styles.description}>
            <View style={styles.pokemonId}>
              <Text style={styles.text}>{selectedPokemon.pokedex_id}</Text>
              <Text style={styles.text}>{selectedPokemon.name}</Text>
            </View>
            <Text style={styles.greatText}>{selectedPokemon.genera}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
              <Text style={styles.greatText}>{selectedPokemon.types[0].type.name}</Text>
              {selectedPokemon.types[1] && (
                <Text style={[styles.greatText, { marginLeft: 5 }]}>
                  {selectedPokemon.types[1].type.name}
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={[styles.view, styles.BottomView]}>
          <Text
            style={{
              fontFamily: 'retroGaming',
              fontSize: 12,
              color: 'white',
            }}
          >
            {selectedPokemon.description}
          </Text>
        </View>
      </View>
    );
  else if (isLoading) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 5,
    backgroundColor: '#21cc96',
  },
  containerLoading: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  topView: {
    flexDirection: 'row',
    width: '100%',
    gap: 5,
    height: '45%',
  },
  BottomView: {
    backgroundColor: '#3a3a3a',
    paddingLeft: 20,
    borderBlockColor: 'black',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    height: '45%',
  },
  description: {
    backgroundColor: 'white',
    borderBlockColor: 'black',
    borderWidth: 2,
    padding: 5,
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  pokemonView: {
    //  backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    // padding: 10,
    width: '45%',
  },
  pokemonId: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pokemonImg: {
    flex: 1,
    resizeMode: 'contain',
    height: 100,
    width: '100%',
    maxHeight: 100,
  },
  text: {
    textTransform: 'capitalize',
    fontFamily: 'retroGaming',
    color: '#535353',
  },
  greatText: {
    textTransform: 'capitalize',

    fontFamily: 'retroGaming',
    textAlign: 'center',
    fontSize: 12,
    color: '#535353',
  },
});
