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

  useEffect(() => {
    if (password !== '' && checkEmail(email)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password]);
  const ref_input2 = useRef<TextInput | null>(null);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // iOS et Android réagissent différemment
    >
      <View style={styles.mainComponent}>
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
              signIn();
            }}
          />
        </View>

        <TouchableOpacity
          testID="submitButton"
          disabled={buttonDisabled}
          style={[
            styles.button,
            buttonDisabled ? { backgroundColor: '#cf95b2ff' } : { backgroundColor: '#DB1778' },
          ]}
          onPress={() => {
            signIn();
            // Navigate after signing in. You may want to tweak this to ensure sign-in is
            // successful before navigating.
            // router.replace("/");
          }}
        >
          <Text style={{ color: 'white' }}>Se connecter</Text>
        </TouchableOpacity>
        <Text style={{ color: '#DB1778' }}>Continuer sans compte</Text>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  mainComponent: {
    flex: 1,
    padding: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingBottom: '25%',
    position: 'relative',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  container: {
    flex: 1,
  },
  logo: {
    width: 100,
    height: 100,
  },
  input: {
    width: '100%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#DDD',
    borderRadius: 10,
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
    backgroundColor: 'white',
    padding: 5,
    color: '#AAA',
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
