import {FC} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useFavorite} from '../context/FavoriteProvider';
import {formatPrice} from '../utils/helper';
import Icon from '@react-native-vector-icons/ant-design';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FavoriteNavigatorProps} from '../navigation/FavoriteNavigator';

interface Props {}

const Fav: FC<Props> = () => {
  const favContext = useFavorite();
  const {navigate} = useNavigation<NavigationProp<FavoriteNavigatorProps>>();
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        // contentContainerStyle={{gap: 10}}
        data={favContext?.items}
        renderItem={({item}) => {
          return (
            <Pressable
              onPress={() => navigate('SingleProduct', {id: item.id})}
              style={styles.productContainer}>
              <Image source={{uri: item.poster}} style={styles.image} />
              <Text numberOfLines={1} style={styles.title}>
                {item.title}
              </Text>
              <Text numberOfLines={1} style={styles.price}>
                {formatPrice(item.price.sale)}
              </Text>

              <Pressable
                onPress={() => favContext?.updateFavorite(item)}
                style={styles.favButton}>
                <Icon name="heart" size={20} color="white" />
              </Pressable>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {width: '100%', height: 150, borderRadius: 8},
  title: {
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: 'gray',
  },
  productContainer: {flex: 1, padding: 5, position: 'relative'},
  favButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Fav;
