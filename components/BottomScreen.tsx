import { StyleSheet, View } from 'react-native';
import ModalFilter from './ModalFilter';
import List from './PokemonList/List';
import BottomMenu from './BottomMenu';
import { Dispatch, useState } from 'react';
import { LED } from './ui/LED';
import { useDispatch } from 'react-redux';
import { setFilter } from '@/redux/actions/pokemonAction';

type BottomScreenType = {
  setSelectedPokemon: (id: number) => void;
};

export default function BottomScreen({ setSelectedPokemon }: BottomScreenType) {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const dispatch: Dispatch<any> = useDispatch();

  const setFilterSelection = ({
    form,
    type,
    searchingValue,
  }: {
    form: string | null;
    type: string | null;
    searchingValue: { text: string; context: 'startAt' | 'all' } | null;
  }) => {
    dispatch(setFilter({ form, type, searchingValue }));
    setShowFilter(false);
  };
  return (
    <View style={styles.mainScreen}>
      <LED />
      <ModalFilter
        setFilterSelection={setFilterSelection}
        showFilter={showFilter}
        showStyle={!showFilter ? { display: 'none' } : {}}
      />
      <List style={showFilter ? { display: 'none' } : {}} selectPokemon={setSelectedPokemon} />
      <BottomMenu showFilter={showFilter} setShowFilter={(value) => setShowFilter(value)} />
    </View>
  );
}
const styles = StyleSheet.create({
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
});
