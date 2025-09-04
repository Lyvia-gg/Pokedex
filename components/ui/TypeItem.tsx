import { typeEnum } from '@/redux/store/type';
import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

type Props = {
  type: typeEnum;
};

export default function TypeItem({ type }: Props) {
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    switch (type) {
      case typeEnum.fire:
        setColor('#ff9e54');
        break;
      case typeEnum.normal:
        setColor('#929ba3');
        break;
      case typeEnum.fighting:
        setColor('#cf3f6b');
        break;
      case typeEnum.grass:
        setColor('#63bd5a');
        break;
      case typeEnum.rock:
        setColor('#c7b88d');
        break;
      case typeEnum.ground:
        setColor('#da7943');
        break;
      case typeEnum.bug:
        setColor('#92c22b');
        break;
      case typeEnum.ghost:
        setColor('#5169af');
        break;
      case typeEnum.dragon:
        setColor('#036dc4');
        break;
      case typeEnum.dark:
        setColor('#5a5365');
        break;
      case typeEnum.fairy:
        setColor('#ed90e7');
        break;
      case typeEnum.flying:
        setColor('#90abdf');
        break;
      case typeEnum.ice:
        setColor('#74cfc1');
        break;
      case typeEnum.poison:
        setColor('#ab6bc9');
        break;
      case typeEnum.water:
        setColor('#4f91d7');
        break;
      case typeEnum.psychic:
        setColor('#4f91d7');
        break;
      case typeEnum.electric:
        setColor('#f4d339');
        break;
      case typeEnum.steel:
        setColor('#5a8fa3');
        break;
      case typeEnum.stellar:
        setColor('#ffffffff');
        break;
      case typeEnum.unknown:
        setColor('#689a8d');
        break;
    }
  }, []);

  return <Text style={[styles.textType, { backgroundColor: color }]}>{type}</Text>;
}

const styles = StyleSheet.create({
  textType: {
    textTransform: 'capitalize',
    fontFamily: 'retroGaming',
    textAlign: 'center',
    fontSize: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderColor: 'black',
    borderWidth: 1,
    color: 'white',
    borderRadius: 5,
  },
});
