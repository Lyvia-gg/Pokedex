import { useSession } from '@/context/AuthContext';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
type ButtonType = {
  buttonDisabled: boolean;
  signIn: (x: object) => void;
};

export default function PokedexButtom({ buttonDisabled, signIn }: ButtonType) {
  return (
    <View
      style={{
        flex: 1,
        height: '45%',
        backgroundColor: '#7b7776',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={styles.container}>
        {/* <TouchableOpacity onPress={() => signOut()} style={[styles.button]}>
        <Text style={{ fontFamily: 'retroGaming', color: 'red', fontSize: 30 }}>X</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          testID="submitButton"
          disabled={buttonDisabled}
          onPress={signIn}
          style={styles.pokeballDot}
        >
          {!buttonDisabled && <Text style={{ fontFamily: 'retroGaming' }}>Start</Text>}
        </TouchableOpacity>
        <View style={styles.pokeballBar}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '120%',
    // backgroundColor: '#3a3a3a',
    backgroundColor: '#ea623e',
    borderColor: '#3a3a3a',
    borderTopWidth: 15,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
    boxSizing: 'content-box',
    overflow: 'hidden',
    position: 'relative',
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: 50,
  },
  pokeballDot: {
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderColor: '#3a3a3a',
    borderWidth: 15,
    boxSizing: 'content-box',
    width: 95,
    marginTop: 45,
    height: 95,
    borderRadius: 999,
    zIndex: 6,
  },
  pokeballBar: {
    width: '120%',
    height: 50,
    marginTop: 45,
    backgroundColor: '#3a3a3a',
    transform: [{ rotate: '45deg' }],
  },
});
