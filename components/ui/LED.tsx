import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
type Props = {
  loading?: boolean;
};
export function LED({ loading = false }: Props) {
  const opacity = useSharedValue<number>(1);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, {
          duration: 1500,
        }),
        withTiming(1, {
          duration: 300,
        }),
        withTiming(0.7, {
          duration: 100,
        }),
        withTiming(0.7, {
          duration: 100,
        }),
        withTiming(1, {
          duration: 200,
        }),
        withTiming(1, {
          duration: 200,
        }),
        withTiming(0.7, {
          duration: 150,
        }),
        withTiming(1, {
          duration: 800,
        }),
        withTiming(0.7, {
          duration: 200,
        }),
        withTiming(1, {
          duration: 100,
        }),
        withTiming(0.7, {
          duration: 200,
        }),
        withTiming(1, {
          duration: 200,
        }),
      ),
      -1,
      false,
    );
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.LED, loading ? { backgroundColor: '#d36600ff' } : animatedStyle]}
      ></Animated.View>
      <Animated.View
        style={[
          styles.spark,
          animatedStyle,
          loading ? { backgroundColor: '#f7c5a4ff' } : animatedStyle,
        ]}
      ></Animated.View>
    </View>
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
