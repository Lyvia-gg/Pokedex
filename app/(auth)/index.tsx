import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
import { useSession } from '@/context/AuthContext';
import PokedexButtom from '@/components/PokedexBottom';
import { signIn as reduxSignIn } from '@/redux/actions/pokemonAction';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
export default function Login() {
  const router = useRouter();
  // const logo = require('@/assets/images/logo.png');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { signIn } = useSession();

  function checkEmail(email: string) {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      return true;
    } else {
      return false;
    }
  }
  const dispatch: Dispatch<any> = useDispatch();

  function auth() {
    // signIn({ email: email, password: password });
    dispatch(reduxSignIn(email));
  }

  useEffect(() => {
    if (password !== '' && checkEmail(email)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password]);
  const ref_input2 = useRef<TextInput | null>(null);
  return (
    <View style={{ flex: 1, display: 'flex', gap: 60, backgroundColor: '#7b7776' }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.mainComponent}>
          <View style={styles.mainScreen}>
            <View style={styles.titleContainer}>
              <Text style={{ fontFamily: 'retroGaming' }}>Connectez vous</Text>
            </View>
            <View style={styles.inputView}>
              <Text style={styles.placeholder}>Identifiant</Text>
              <TextInput
                testID="inputEmail"
                style={styles.input}
                returnKeyType="next"
                onSubmitEditing={() => ref_input2.current?.focus()}
                blurOnSubmit={false}
                onChangeText={onChangeEmail}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.placeholder}>Mot de passe</Text>
              <TextInput
                testID="inputPassword"
                ref={ref_input2}
                style={styles.input}
                secureTextEntry={true}
                onChangeText={onChangePassword}
                onSubmitEditing={() => {
                  auth();
                }}
              />
            </View>
          </View>

          {/* <TouchableOpacity
            testID="submitButton"
            disabled={buttonDisabled}
            style={[
              styles.button,
              buttonDisabled ? { backgroundColor: '#cf95b2ff' } : { backgroundColor: '#DB1778' },
            ]}
            onPress={() => {
              signIn({ email: email, password: password });
            }}
          >
            <Text style={{ color: 'white' }}>Se connecter</Text>
          </TouchableOpacity> */}
        </View>
      </KeyboardAvoidingView>
      <PokedexButtom buttonDisabled={buttonDisabled} signIn={() => auth()} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '45%',
    display: 'flex',
    alignItems: 'center',
  },
  mainComponent: {
    // flex: 1,
    // padding: 40,
    height: '100%',
    flexDirection: 'column',
    backgroundColor: '#3a3a3a',
    borderColor: '#000',
    borderWidth: 2,
    // borderWidth: 10,
    // borderTopWidth: 45,
    padding: 10,
    paddingTop: 45,
    // backgroundColor: '#7b7776',
    width: '90%',
    // marginTop: 20,
    // marginBottom: 30,
    // height: '35%',
    // paddingBottom: '25%',
    position: 'relative',
  },
  mainScreen: {
    backgroundColor: '#21cc96',
    borderColor: '#000',
    borderWidth: 2,
    // flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: 10,
    alignItems: 'center',
    height: '100%',
  },
  titleContainer: {
    width: '100%',
    borderColor: '#3a3a3a',
    borderTopWidth: 5,
    borderBottomWidth: 5,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    padding: 10,
    // position: 'absolute',
    top: 5,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },

  logo: {
    width: 100,
    height: 100,
  },
  input: {
    width: '90%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#3a3a3a',
    borderRadius: 10,
    fontFamily: 'retroGaming',
  },
  inputView: {
    position: 'relative',
    width: '100%',
  },
  placeholder: {
    position: 'absolute',
    top: -5,
    left: 20,
    zIndex: 5,
    backgroundColor: '#21cc96',
    padding: 5,
    color: '#3a3a3ab4',
    fontFamily: 'retroGaming',
  },
  button: {
    // backgroundColor: "#DB1778",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
});
