import { useSession } from '@/context/AuthContext';
import { signOut } from '@/redux/actions/pokemonAction';
import { Dispatch } from '@reduxjs/toolkit';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

type BottomMenuType = {
  setShowFilter: (value: boolean) => void;
  showFilter: boolean;
};

export default function BottomMenu({ setShowFilter, showFilter }: BottomMenuType) {
  // const { signOut } = useSession();
  const dispatch: Dispatch<any> = useDispatch();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['transparent', '#000']} style={styles.background} />
      <LinearGradient colors={['#ffffff60', 'transparent']} style={styles.background} />
      <TouchableOpacity
        onPress={() => setShowFilter(true)}
        style={[styles.button, { width: 'auto' }, showFilter ? { display: 'none' } : {}]}
      >
        <Text style={{ fontFamily: 'retroGaming', color: 'white', fontSize: 20 }}>Filter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowFilter(false)} style={[styles.button, { right: 0 }]}>
        <Text style={{ fontFamily: 'retroGaming', color: 'rgba(7, 115, 238, 1)', fontSize: 35 }}>
          {'<'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(signOut())} style={[styles.button, { right: 40 }]}>
        <Text style={{ fontFamily: 'retroGaming', color: 'red', fontSize: 30 }}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#3a3a3a',
    height: 50,
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    borderColor: '#000',
    borderTopWidth: 2,
    // gap: 5,
  },
  button: {
    padding: 10,
    // borderRadius: 10,
    width: 50,
    position: 'absolute',
    zIndex: 10,
  },
  background: {
    width: '100%',
    position: 'absolute',
    height: '100%',
  },
});
