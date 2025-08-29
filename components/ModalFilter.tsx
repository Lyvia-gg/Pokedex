import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
// import BottomMenu from './BottomMenu';

type ModalFilterProps = {
  style?: object;
};

export default function ModalFilter({ style }: ModalFilterProps) {
  return (
    <View style={[styles.container, style]}>
      <Text>filtre !</Text>
      {/* <BottomMenu /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    // height:'100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    backgroundColor: '#2f2f2f',
    // position: 'absolute',
    // zIndex: 15,
  },
});
