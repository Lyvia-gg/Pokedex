import { StyleSheet, View } from 'react-native';
import ModalFilter from './ModalFilter';
import List from './PokemonList/List';
import BottomMenu from './BottomMenu';
import { useState } from 'react';
import { LED } from './ui/LED';

type BottomScreenType = {
  setSelectedPokemon: (id: number) => void;
};

export default function BottomScreen({ setSelectedPokemon }: BottomScreenType) {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  return (
    <View style={styles.mainScreen}>
      <LED />
      <ModalFilter showFilter={showFilter} style={!showFilter ? { display: 'none' } : {}} />
      <List style={showFilter ? { display: 'none' } : {}} selectPokemon={setSelectedPokemon} />

      {/* <BottomScreen pokemons={pokemons} setSelectedPokemon={setSelectedPokemon} /> */}
      <BottomMenu showFilter={showFilter} setShowFilter={(value) => setShowFilter(value)} />
    </View>
  );
}
const styles = StyleSheet.create({
  mainScreen: {
    backgroundColor: '#21cc96',
    // flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    // gap: 10,
    position: 'relative',
    alignItems: 'center',
    height: '100%',
    borderColor: '#000',
    borderWidth: 2,
  },
});
