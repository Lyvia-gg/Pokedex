import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import PokedexButtom from '@/components/PokedexBottom';
import { signIn } from '@/redux/actions/pokemonAction';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { LED } from '@/components/ui/LED';
import InputComponent from '@/components/ui/InputComponent';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
export default function Login() {
  const [email, onChangeEmail] = useState('chuck.noris@gmail.com');
  const [password, onChangePassword] = useState(
    "Au commencement, il regarda Arceus créer l'univers",
  );
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const ref_input2 = useRef<TextInput | null>(null);
  const dispatch: Dispatch<any> = useDispatch();
  const windowHeight = Dimensions.get('window').height;
  const translateY = useSharedValue<number>(0);
  const opacityInput = useSharedValue<number>(1);
  const opacityScreen = useSharedValue<number>(0);
  const [loadingScreen, setLoadingScreen] = useState<boolean>(false);

  useEffect(() => {
    if (password !== '' && checkEmail(email)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password]);

  useEffect(() => {
    if (loadingScreen) {
      fadeInInput();
    }
  }, [loadingScreen]);
  useEffect(() => {
    setTimeout(() => {
      fadeInScreen();
    }, 300);
  }, []);

  const checkEmail = (email: string) => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const auth = () => {
    dispatch(signIn(email));
  };

  const handlePress = () => {
    setButtonDisabled(true);
    fadeOutInput();
    setTimeout(() => {
      setLoadingScreen(true);
    }, 500);
    setTimeout(() => {
      translateY.value += windowHeight / 4 - 1;
      setTimeout(() => {
        fadeOutScreen();
        setTimeout(() => {
          auth();
        }, 1000);
      }, 1000);
    }, 1000);
  };
  const animatedTranslate = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSpring(translateY.value * 2, {
          stiffness: 900,
          damping: 120,
          mass: 4,
          overshootClamping: false,
        }),
      },
    ],
  }));

  const animatedOpacityInput = useAnimatedStyle(() => ({
    opacity: opacityInput.value,
  }));
  const animatedOpacityScreen = useAnimatedStyle(() => ({
    opacity: opacityScreen.value,
  }));

  const fadeOutInput = () => {
    opacityInput.value = withTiming(0, { duration: 500 });
  };
  const fadeInInput = () => {
    opacityInput.value = withTiming(1, { duration: 500 });
  };
  const fadeOutScreen = () => {
    opacityScreen.value = withTiming(0, { duration: 500 });
  };
  const fadeInScreen = () => {
    opacityScreen.value = withTiming(1, { duration: 500 });
  };

  return (
    <View
      style={{
        backgroundColor: '#7b7776',
        flex: 1,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <View
        style={[
          styles.mainComponent,
          {
            position: 'absolute',
            width: '90%',
            height: '50%',
            zIndex: 0,
            paddingBottom: 45,
            paddingTop: 10,
          },
        ]}
      >
        <View style={[styles.mainScreen, { justifyContent: 'center' }]}>
          {/* <Image style={[{ height: 150, width: 150, objectFit: 'contain' }]} source={url}></Image> */}
        </View>
      </View>
      <Animated.View style={[styles.container, animatedTranslate]}>
        <KeyboardAvoidingView
          style={[styles.container, styles.containerKeyBoard]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.mainComponent}>
            <View style={styles.mainScreen}>
              <LED loading={loadingScreen} />
              <Animated.View
                style={[
                  animatedOpacityScreen,
                  {
                    flex: 1,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 20,
                  },
                ]}
              >
                <View style={styles.titleContainer}>
                  <Text style={{ fontFamily: 'retroGaming' }}>Sign in</Text>
                </View>
                <Animated.View
                  style={[
                    animatedOpacityInput,
                    {
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      paddingTop: 10,
                    },
                  ]}
                >
                  {!loadingScreen ? (
                    <>
                      <View style={styles.inputView}>
                        <Text style={styles.placeholder}>Email</Text>
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
                        <Text style={styles.placeholder}>Password</Text>
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
                    </>
                  ) : (
                    <View
                      style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: 10,
                        position: 'absolute',
                        alignSelf: 'center',
                        top: '40%',
                      }}
                    >
                      <ActivityIndicator color={'black'} size={'large'} />
                      <Text style={{ fontFamily: 'retroGaming' }}>Connecting...</Text>
                    </View>
                  )}
                </Animated.View>
              </Animated.View>
            </View>
          </View>
        </KeyboardAvoidingView>
        <PokedexButtom buttonDisabled={buttonDisabled} signIn={handlePress} />
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    width: '100%',
    // gap: 60,
    backgroundColor: '#7b7776',
    borderTopColor: 'black',
    borderTopWidth: 3,
    boxSizing: 'content-box',
  },
  containerKeyBoard: {
    alignItems: 'center',
    // marginBottom: 60,
    height: '50%',
  },
  mainComponent: {
    height: '100%',
    // flex: 1,
    flexDirection: 'column',
    backgroundColor: '#3a3a3a',
    borderColor: '#000',
    borderWidth: 2,
    borderTopWidth: 0,
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
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: 10,
    alignItems: 'center',
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
