import { Dispatch, SetStateAction } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InputComponent from './InputComponent';

type Props = {
  searchPhrase: string | null;
  setSearchPhrase: Dispatch<SetStateAction<string | null>>;
  onSubmit: () => void;
  title?: string | null;
  placeholder?: string;
};

export default function SearchBar({
  searchPhrase,
  setSearchPhrase,
  onSubmit,
  placeholder = '',
  title = null,
}: Props) {
  return (
    <View style={styles.container}>
      {title && (
        <Text
          style={{
            fontFamily: 'retroGaming',
            color: '#FFF',
            fontSize: 18,
            marginTop: 25,
            marginBottom: 10,
            textAlign: 'left',
            width: '100%',
          }}
        >
          {title}
        </Text>
      )}
      <InputComponent
        value={searchPhrase ? searchPhrase : ''}
        onChange={setSearchPhrase}
        testID="SearchInput"
        onSubmit={onSubmit}
        returnKeyType="search"
        searchBar={true}
        placeholder={placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // flexDirection: 'row',
    width: '100%',
    // backgroundColor: 'white',
  },
  input: {
    fontSize: 20,
    width: '100%',
    fontFamily: 'retroGaming',
  },
});
