import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  text?: string;
}

const EmptyContainer: FC<Props> = ({text}) => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 40,
    textAlign: 'center',
    color: 'black',
    opacity: 0.5,
  },
});

export default EmptyContainer;
