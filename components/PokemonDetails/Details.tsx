import { Image } from 'expo-image';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function Details() {
  const selectedPokemon: IPokemon | null = useSelector(
    (state: PokemonState) => state.selectedPokemon,
  );
  if (selectedPokemon)
    return (
      <View style={styles.container}>
        <View style={[styles.view, styles.topView]}>
          <Image
            source={selectedPokemon.sprite.regular}
            style={styles.pokemonImg}
            contentFit="contain"
          ></Image>
          <View style={styles.description}>
            <Text
              style={{
                textTransform: 'capitalize',
                fontFamily: 'retroGaming',
                color: '#535353',
              }}
            >
              {selectedPokemon.name}
            </Text>
            <Text
              style={{
                textTransform: 'capitalize',
                fontFamily: 'retroGaming',
                position: 'absolute',
                top: 5,
                left: 10,
                color: '#535353',
              }}
            >
              {selectedPokemon.pokedex_id}
            </Text>
            <Text
              style={{
                fontFamily: 'retroGaming',
                textAlign: 'center',
                fontSize: 12,
                color: '#535353',
              }}
            >
              {selectedPokemon.genera}
            </Text>
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
              <Text
                style={{
                  textTransform: 'capitalize',
                  fontFamily: 'retroGaming',
                  fontSize: 12,
                  color: '#535353',
                }}
              >
                {selectedPokemon.types[0].type.name}
              </Text>
              {selectedPokemon.types[1] && (
                <Text
                  style={{
                    textTransform: 'capitalize',
                    fontFamily: 'retroGaming',
                    fontSize: 12,
                    color: '#535353',
                    marginLeft: 5,
                  }}
                >
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
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    gap: 30,
    width: '100%',
    paddingTop: 20,
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
    borderBottomWidth: 1,
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
  pokemonImg: {
    flex: 1,
    resizeMode: 'contain',
    height: 100,
    width: '100%',
    maxHeight: 100,
  },
});
