import { useSession } from '@/context/AuthContext';
import { signOut } from '@/redux/actions/pokemonAction';
import { Dispatch } from '@reduxjs/toolkit';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function BottomMenu() {
  // const { signOut } = useSession();
  const dispatch: Dispatch<any> = useDispatch();

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['transparent', '#000']}
        end={{ x: 0.5, y: 0.2 }}
        style={styles.background}
      />
      <LinearGradient
        // Background Linear Gradient
        colors={['#ffffff60', 'transparent']}
        style={styles.background}
      />
      <TouchableOpacity onPress={() => dispatch(signOut())} style={[styles.button]}>
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
    alignItems: 'flex-end',
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: 50,
    position: 'relative',
    zIndex: 10,
  },
  background: {
    width: '100%',
    position: 'absolute',
    height: '100%',
  },
});
