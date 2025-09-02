import { StyleSheet, View } from 'react-native';
import DropdownSelect from 'react-native-input-select';

type SelectComponentProps = {
  list: { label: string; value: any }[];
  item: number | null;
  setItem: (value: number | null) => void;
  placeholder: string;
  label: string;
};

export default function SelectComponent({
  list,
  item,
  setItem,
  placeholder,
  label = ' ',
}: SelectComponentProps) {
  return (
    <DropdownSelect
      label={label}
      placeholder={placeholder}
      options={list}
      selectedValue={item == null ? undefined : item}
      onValueChange={(itemValue: any) => {
        if (itemValue === '') {
          setItem(null);
        } else {
          setItem(itemValue);
        }
      }}
      placeholderStyle={{
        color: 'black',
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'retroGaming',
      }}
      modalControls={{
        modalBackgroundStyle: {
          backgroundColor: 'rgba(196, 198, 246, 0.5)',
        },
      }}
      labelStyle={{
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'retroGaming',
        height: 20,
      }}
      checkboxControls={{
        checkboxSize: 15,
        checkboxStyle: {
          backgroundColor: 'black',
          borderRadius: 30,
          padding: 5,
          borderColor: 'black',
        },
        checkboxLabelStyle: {
          color: 'black',
          textTransform: 'capitalize',
          fontSize: 20,
          fontFamily: 'retroGaming',
        },
        checkboxComponent: <View style={styles.radioButton} />,
      }}
      selectedItemStyle={{
        color: 'black',
        textTransform: 'capitalize',
        fontFamily: 'retroGaming',
      }}
    />
  );
}

const styles = StyleSheet.create({
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: 'red',
  },
});
