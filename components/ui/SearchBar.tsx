import { Dispatch, SetStateAction } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InputComponent from './InputComponent';

type Props = {
  searchPhrase: string | null;
  setSearchPhrase: Dispatch<SetStateAction<string | null>>;
  title?: string | null;
  placeholder?: string;
};

export default function SearchBar({
  searchPhrase,
  setSearchPhrase,
  placeholder = '',
  title = null,
}: Props) {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.text}>{title}</Text>}
      <InputComponent
        value={searchPhrase ? searchPhrase : ''}
        onChange={setSearchPhrase}
        testID="SearchInput"
        onSubmit={() => {}}
        returnKeyType="search"
        searchBar={true}
        placeholder={placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    fontSize: 20,
    width: '100%',
    fontFamily: 'retroGaming',
  },
  text: {
    fontFamily: 'retroGaming',
    color: '#FFF',
    fontSize: 18,
    marginTop: 25,
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
});
