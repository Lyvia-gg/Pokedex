import { RefObject } from 'react';
import {
  ReturnKeyTypeOptions,
  StyleSheet,
  SubmitBehavior,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  value: string;
  onChange: (text: string) => void;
  returnKeyType: ReturnKeyTypeOptions | undefined;
  submitBehavior?: SubmitBehavior | undefined;
  testID: string;
  onSubmit: () => void;
  ref?: RefObject<TextInput | null>;
  secureTextEntry?: boolean;
  searchBar?: boolean;
  placeholder?: string;
};

export default function InputComponent({
  value,
  onChange,
  returnKeyType,
  submitBehavior,
  testID,
  onSubmit,
  ref,
  secureTextEntry = false,
  searchBar = false,
  placeholder = '',
}: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        testID={testID}
        value={value}
        placeholder={placeholder}
        style={[
          styles.input,
          searchBar
            ? {
                backgroundColor: 'white',
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }
            : {},
        ]}
        returnKeyType={returnKeyType}
        ref={ref}
        submitBehavior={submitBehavior}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        secureTextEntry={secureTextEntry}
      />
      {searchBar && (
        <TouchableOpacity onPress={onSubmit} style={styles.button}>
          <Text style={styles.text}>{'>'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '90%',
    margin: 12,
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#3a3a3a',
    fontFamily: 'retroGaming',
  },
  button: {
    backgroundColor: '#009c4a',
    width: 50,
    height: 50,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'retroGaming',
    fontSize: 30,
    color: 'white',
  },
});
