import { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View } from 'react-native';
import InputComponent from './InputComponent';

type Props = {
  searchPhrase: string;
  setSearchPhrase: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
};

export default function SearchBar({ searchPhrase, setSearchPhrase, onSubmit }: Props) {
  return (
    <View style={styles.container}>
      <InputComponent
        value={searchPhrase}
        onChange={setSearchPhrase}
        testID="SearchInput"
        onSubmit={onSubmit}
        returnKeyType="search"
        searchBar={true}
        placeholder="Search..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
  },
  input: {
    fontSize: 20,
    width: '90%',
    fontFamily: 'retroGaming',
  },
});
