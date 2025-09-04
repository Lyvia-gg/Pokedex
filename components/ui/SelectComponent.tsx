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
        if (itemValue === '' || itemValue == undefined) {
          setItem(null);
        } else {
          setItem(itemValue);
        }
      }}
      placeholderStyle={styles.placeholder}
      modalControls={{
        modalBackgroundStyle: styles.modalBackground,
      }}
      labelStyle={styles.label}
      checkboxControls={{
        checkboxSize: 15,
        checkboxStyle: styles.checkboxStyle,
        checkboxLabelStyle: styles.checkboxLabel,
        checkboxComponent: <View style={styles.radioButton} />,
      }}
      selectedItemStyle={styles.selectedItem}
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
  placeholder: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'retroGaming',
  },
  label: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'retroGaming',
    height: 20,
  },
  checkboxStyle: {
    backgroundColor: 'black',
    borderRadius: 30,
    padding: 5,
    borderColor: 'black',
  },
  checkboxLabel: {
    color: 'black',
    textTransform: 'capitalize',
    fontSize: 20,
    fontFamily: 'retroGaming',
  },
  selectedItem: {
    color: 'black',
    textTransform: 'capitalize',
    fontFamily: 'retroGaming',
  },
  modalBackground: {
    backgroundColor: 'rgba(196, 198, 246, 0.5)',
  },
});
