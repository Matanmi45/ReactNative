import {FC} from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';

interface Props<T> {
  data: T[];
  renderItem: ListRenderItem<T>;
}

const CategoryList = <T extends unknown>(props: Props<T>) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: 20}}
        data={props.data}
        renderItem={props.renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default CategoryList;
