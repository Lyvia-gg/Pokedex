import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export function LED() {
  const opacity = useSharedValue(1);

  useEffect(() => {
    //marche pas sur tel... idk why
    let isMounted = true;

    const loop = () => {
      if (!isMounted) return;
      const nextValue = Math.random() > 0.1 ? 1 : 0.7;
      const duration = Math.floor(Math.random() * 100) + 50;

      opacity.value = withTiming(nextValue, { duration }, () => {
        setTimeout(loop, Math.floor(Math.random() * 100));
      });
    };

    loop();

    return () => {
      isMounted = false;
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={[styles.LED, animatedStyle]}></Animated.View>
      <Animated.View style={[styles.spark, animatedStyle]}></Animated.View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 50,
    position: 'absolute',
    top: 50,
    right: -40,
    borderColor: '#000',
    backgroundColor: '#000',
    borderWidth: 2,
  },
  LED: {
    width: '100%',
    height: '100%',
    backgroundColor: '#009c4a',
  },
  spark: {
    position: 'absolute',
    top: 5,
    left: 2,
    width: '20%',
    height: '50%',
    backgroundColor: '#84faa8ff',
  },
});
