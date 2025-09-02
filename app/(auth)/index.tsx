import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import PokedexButtom from '@/components/PokedexBottom';
import { signIn as reduxSignIn } from '@/redux/actions/pokemonAction';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { LED } from '@/components/ui/LED';
import InputComponent from '@/components/ui/InputComponent';
export default function Login() {
  const router = useRouter();
  const [email, onChangeEmail] = useState('chuck.noris@gmail.com');
  const [password, onChangePassword] = useState(
    "Au commencement, il regarda Arceus crée l'univers",
  );
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const ref_input2 = useRef<TextInput | null>(null);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    if (password !== '' && checkEmail(email)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password]);

  const checkEmail = (email: string) => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const auth = () => {
    dispatch(reduxSignIn(email));
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={[styles.container, styles.containerKeyBoard]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.mainComponent}>
          <View style={styles.mainScreen}>
            <LED />
            <View style={styles.titleContainer}>
              <Text style={{ fontFamily: 'retroGaming' }}>Connectez vous</Text>
            </View>
            <View style={styles.inputView}>
              <Text style={styles.placeholder}>Identifiant</Text>
              <InputComponent
                value={email}
                onChange={onChangeEmail}
                returnKeyType="next"
                submitBehavior="newline"
                testID="inputEmail"
                onSubmit={() => ref_input2.current?.focus()}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.placeholder}>Mot de passe</Text>
              <InputComponent
                returnKeyType="done"
                submitBehavior="newline"
                testID="inputPassword"
                ref={ref_input2}
                value={password}
                secureTextEntry={true}
                onChange={onChangePassword}
                onSubmit={auth}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <PokedexButtom buttonDisabled={buttonDisabled} signIn={auth} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, display: 'flex', width: '100%', gap: 60, backgroundColor: '#7b7776' },
  containerKeyBoard: {
    alignItems: 'center',
  },
  mainComponent: {
    height: '100%',
    flexDirection: 'column',
    backgroundColor: '#3a3a3a',
    borderColor: '#000',
    borderWidth: 2,
    padding: 10,
    paddingTop: 45,
    width: '90%',
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
    position: 'relative',
  },
  titleContainer: {
    width: '100%',
    borderColor: '#3a3a3a',
    borderTopWidth: 5,
    borderBottomWidth: 5,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    padding: 10,
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
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
});
