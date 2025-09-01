import { RefObject } from 'react';
import { ReturnKeyTypeOptions, StyleSheet, SubmitBehavior, TextInput } from 'react-native';

type Props = {
  value: string;
  onChange: (text: string) => void;
  returnKeyType: ReturnKeyTypeOptions | undefined;
  submitBehavior?: SubmitBehavior | undefined;
  testID: string;
  onSubmit: () => void;
  ref?: RefObject<TextInput | null>;
  secureTextEntry?: boolean;
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
}: Props) {
  return (
    <TextInput
      testID={testID}
      value={value}
      style={styles.input}
      returnKeyType={returnKeyType}
      ref={ref}
      submitBehavior={submitBehavior}
      onChangeText={onChange}
      onSubmitEditing={onSubmit}
      secureTextEntry={secureTextEntry}
    />
  );
}
const styles = StyleSheet.create({
  input: {
    width: '90%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#3a3a3a',
    borderRadius: 10,
    fontFamily: 'retroGaming',
  },
});
