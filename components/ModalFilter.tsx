import { getFilters } from '@/redux/actions/pokemonAction';
import { Dispatch } from '@reduxjs/toolkit';
import { use, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import BottomMenu from './BottomMenu';
import DropdownSelect from 'react-native-input-select';
import SelectComponent from './ui/SelectComponent';
import { IFiltersList, PokemonState, textFilterEnum } from '@/redux/store/type';
import SearchBar from './ui/SearchBar';
// import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

type ModalFilterProps = {
  showStyle?: object;
  showFilter: boolean;
  setFilterSelection: ({
    form,
    type,
    searchingValue,
  }: {
    form: string | null;
    type: string | null;
    searchingValue: { text: string; context: textFilterEnum } | null;
  }) => void;
};

export default function ModalFilter({
  showStyle,
  showFilter,
  setFilterSelection,
}: ModalFilterProps) {
  const filters: { isLoading: boolean; filterList: IFiltersList | null } = useSelector(
    (state: PokemonState) => state.filters,
    shallowEqual,
  );
  const [form, setForm] = useState<number | null>(null);
  const [type, setType] = useState<number | null>(null);
  const [searchPhrase, setSearchPhrase] = useState<string | null>(null);
  const [textFilterOption, setTextFilterOption] = useState<string | null>(textFilterEnum.startWith);
  const [list, setList] = useState<any>({ form: [], type: [] });
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    if (filters.filterList === null && showFilter) {
      dispatch(getFilters());
    }
  }, [showFilter]);

  useEffect(() => {
    if (filters.filterList) {
      list.form.length == 0 &&
        filters.filterList.forms.map((form: any, id: number) => {
          setList(
            (prevList: {
              form: { label: string; value: number }[];
              type: { label: string; value: number }[];
            }) => {
              return {
                ...prevList,
                form: [...prevList.form, { label: form.name, value: id }],
              };
            },
          );
        });
      list.type.length == 0 &&
        filters.filterList.types.map((type: any, id: number) => {
          setList(
            (prevList: {
              form: { label: string; value: number }[];
              type: { label: string; value: number }[];
            }) => {
              return {
                ...prevList,
                type: [...prevList.type, { label: type.name, value: id }],
              };
            },
          );
        });
    }
  }, [filters.filterList]);
  return (
    <ScrollView
      style={[styles.container, showStyle]}
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-between' }}
    >
      <Text style={{ fontFamily: 'retroGaming', color: '#FFF', fontSize: 20 }}>Filters !</Text>
      <SearchBar
        title="Pokemon name or ID"
        placeholder="Cubone... or 104..."
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
      ></SearchBar>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.buttonFilter,
            textFilterOption == textFilterEnum.startWith
              ? styles.buttonFilterSelect
              : textFilterOption == textFilterEnum.all
                ? { backgroundColor: 'rgba(67, 92, 67, 1)' }
                : {},
          ]}
          onPress={() => setTextFilterOption(textFilterEnum.startWith)}
        >
          <Text style={styles.text}>
            Start with{textFilterOption == textFilterEnum.startWith ? ' ☑' : ''}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonFilter,
            textFilterOption == textFilterEnum.endWith
              ? styles.buttonFilterSelect
              : textFilterOption == textFilterEnum.all
                ? { backgroundColor: 'rgba(67, 92, 67, 1)' }
                : {},
          ]}
          onPress={() => setTextFilterOption(textFilterEnum.endWith)}
        >
          <Text style={styles.text}>
            End with{textFilterOption == textFilterEnum.endWith ? ' ☑' : ''}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonFilter,
            textFilterOption == textFilterEnum.all ? styles.buttonFilterSelect : {},
          ]}
          onPress={() => setTextFilterOption(textFilterEnum.all)}
        >
          <Text style={styles.text}>All{textFilterOption == textFilterEnum.all ? ' ☑' : ''}</Text>
        </TouchableOpacity>
      </View>
      {filters.isLoading && filters.filterList === null ? (
        <ActivityIndicator size="large" color="#FFF" />
      ) : (
        <View
          style={{
            flex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 30,
          }}
        >
          <SelectComponent
            list={list.form}
            item={form != null ? form : null}
            setItem={(value) => {
              setForm(value);
            }}
            label="Pokemon form"
            placeholder="Select a form..."
          />
          <SelectComponent
            list={list.type}
            item={type != null ? type : null}
            setItem={(value) => {
              setType(value);
            }}
            label="Pokemon type"
            placeholder="Select a type..."
          />
          <TouchableOpacity
            onPress={() => {
              setFilterSelection({
                form: form != null && form != undefined ? list.form[form].label : null,
                type: type != null && type != undefined ? list.type[type].label : null,
                searchingValue: searchPhrase
                  ? { text: searchPhrase, context: textFilterOption }
                  : null,
              });
            }}
          >
            <Text style={styles.button}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    gap: 5,
    backgroundColor: '#2f2f2f',
    padding: 10,
  },
  text: {
    fontFamily: 'retroGaming',
    fontSize: 12,
    color: 'white',
  },
  button: {
    color: 'white',
    fontFamily: 'retroGaming',
    backgroundColor: 'rgba(46, 153, 46, 1)',
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  buttonFilter: {
    backgroundColor: 'rgba(221, 50, 50, 1)',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonFilterSelect: {
    backgroundColor: 'green',
  },
});
