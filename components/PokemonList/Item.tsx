import { StyleSheet, Text, View } from 'react-native';

type Pokemon = {
  pokemon: IPokemon;
};
export default function Item({ pokemon }: Pokemon) {
  return (
    <View style={styles.container}>
      <Text>
        {pokemon.pokedex_id} {pokemon.name['fr']}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    // display: 'flex',
    // flex: 1,
    // paddingTop: 10,
    // paddingBottom: 10,
    // backgroundColor: '#99b6dbff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
});
