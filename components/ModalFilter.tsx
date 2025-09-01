import { getFilters } from '@/redux/actions/pokemonAction';
import { Dispatch } from '@reduxjs/toolkit';
import { use, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import BottomMenu from './BottomMenu';
import DropdownSelect from 'react-native-input-select';

type ModalFilterProps = {
  style?: object;
  showFilter: boolean;
};

export default function ModalFilter({ style, showFilter }: ModalFilterProps) {
  const filters: { isLoading: boolean; filterList: IFiltersList | null } = useSelector(
    (state: PokemonState) => state.filters,
    shallowEqual,
  );
  const [FormList, setFormList] = useState<any>([]);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    if (filters.filterList === null && showFilter) {
      dispatch(getFilters());
    }
    if (filters.filterList) {
      filters.filterList.forms.map((form: any) => {
        setFormList((prevList: []) => [...prevList, { label: form.name, value: form.id }]);
      });
    }
  }, [showFilter]);
  const [item, setItem] = useState<any>('');

  return (
    <View style={[styles.container, style]}>
      <Text style={{ fontFamily: 'retroGaming', color: '#FFF', fontSize: 20 }}>Filters !</Text>
      {filters.isLoading && filters.filterList === null ? (
        <ActivityIndicator size="large" color="#FFF" />
      ) : (
        <View
          style={{
            flex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <DropdownSelect
            label=" "
            placeholder="Select an form..."
            options={FormList}
            selectedValue={item}
            onValueChange={(itemValue: any) => setItem(itemValue)}
            placeholderStyle={{
              // color: 'purple',
              fontSize: 15,
              fontWeight: '500',
              fontFamily: 'retroGaming',
            }}
            labelStyle={{ color: 'teal', fontSize: 15, fontWeight: '500' }}
            dropdownHelperTextStyle={{
              color: 'green',
              fontWeight: '900',
            }}
            modalControls={{
              modalBackgroundStyle: {
                backgroundColor: 'rgba(196, 198, 246, 0.5)',
              },
            }}
            // helperText="The placeholder has been styled"
            checkboxControls={{
              checkboxSize: 15,
              checkboxStyle: {
                backgroundColor: 'purple',
                borderRadius: 30, // To get a circle - add the checkboxSize and the padding size
                padding: 5,
                borderColor: 'red',
              },
              checkboxLabelStyle: { color: 'red', fontSize: 20 },
              checkboxComponent: <View style={styles.radioButton} />,
            }}
            selectedItemStyle={{
              color: 'hotpink',
              fontWeight: '900',
            }}
          />
          {/* <Text style={{ fontFamily: 'retroGaming', color: '#FFF', fontSize: 16 }}>
            Filter Options
          </Text> */}
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    // height:'100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    backgroundColor: '#2f2f2f',
    padding: 10,
    // position: 'absolute',
    // zIndex: 15,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: 'blue',
  },
});
