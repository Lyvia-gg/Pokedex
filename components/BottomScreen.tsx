import { StyleSheet, View } from 'react-native';
import ModalFilter from './ModalFilter';
import List from './PokemonList/List';
import BottomMenu from './BottomMenu';
import { Dispatch, useEffect, useState } from 'react';
import { LED } from './ui/LED';
import { useDispatch } from 'react-redux';
import { setFilter } from '@/redux/actions/pokemonAction';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { textFilterEnum } from '@/redux/store/type';

type BottomScreenType = {
  setSelectedPokemon: (id: number) => void;
  onClose: () => void;
};

export default function BottomScreen({ setSelectedPokemon, onClose }: BottomScreenType) {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch: Dispatch<any> = useDispatch();
  const opacityList = useSharedValue<number>(0);
  const translateX = useSharedValue<number>(40);

  useEffect(() => {
    onLoading();
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  const setFilterSelection = ({
    form,
    type,
    searchingValue,
  }: {
    form: string | null;
    type: string | null;
    searchingValue: { text: string; context: textFilterEnum } | null;
  }) => {
    dispatch(setFilter({ form, type, searchingValue }));
    setShowFilter(false);
  };

  const animatedOpacityList = useAnimatedStyle(() => ({
    opacity: opacityList.value,
  }));
  const animatedTranslate = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSpring(translateX.value * 2, {
          stiffness: 900,
          damping: 120,
          mass: 4,
          overshootClamping: false,
        }),
      },
    ],
  }));

  const onLoading = () => {
    setTimeout(() => {
      fadeInList();
      translateX.value = 0;
    }, 500);
  };
  const onUnload = () => {
    fadeOutList();
    setTimeout(() => {
      translateX.value = 40;
      setTimeout(() => {
        onClose();
      }, 700);
    }, 500);
  };
  const fadeInList = () => {
    opacityList.value = withTiming(1, { duration: 500 });
  };
  const fadeOutList = () => {
    opacityList.value = withTiming(0, { duration: 500 });
  };

  return (
    <View style={styles.mainScreen}>
      <LED loading={loading} />
      <View style={[styles.mainScreen, { overflow: 'hidden', borderWidth: 0 }]}>
        <ModalFilter
          setFilterSelection={setFilterSelection}
          showFilter={showFilter}
          showStyle={!showFilter ? { display: 'none' } : {}}
        />
        <Animated.View
          style={[
            animatedOpacityList,
            { flex: 1, width: '100%' },
            showFilter ? { display: 'none' } : {},
          ]}
        >
          <List selectPokemon={setSelectedPokemon} />
        </Animated.View>
        <Animated.View style={[animatedTranslate, { width: '100%', alignSelf: 'flex-end' }]}>
          <BottomMenu
            onClose={onUnload}
            showFilter={showFilter}
            setShowFilter={(value) => setShowFilter(value)}
          />
        </Animated.View>
      </View>
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
    // overflow: 'hidden',
  },
});
