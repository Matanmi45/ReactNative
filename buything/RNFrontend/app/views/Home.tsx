import {FC, useEffect, useState} from 'react';
import {StyleSheet, FlatList, Pressable, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackNavigator} from '../navigation/AuthNavigator';
import {useAuth} from '../context/AuthProvider';
import client from '../api/client';
import ProductCard, {offset, Product} from '../components/ProductCard';
import CategoryList from '../components/CategoryList';
import CategoryBtn from '../components/CategoryBtn';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeNavigatorProps} from '../navigation/HomeNavigator';

interface Props {}

const Home: FC<Props> = () => {
  const [fetching, setFetching] = useState(true);
  const navigation = useNavigation<NavigationProp<HomeNavigatorProps>>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const {data} = await client.get<{products: Product[]}>(
          '/product/products',
        );
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const {data} = await client.get<{categories: string[]}>(
          '/product/categories',
        );
        setCategories(['All', ...data.categories]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts().finally(() => setFetching(false));
    fetchCategories();
  }, []);

  const handleOnCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    // fetch products by category
    try {
      if (category === 'All') category = '';
      const {data} = await client.get<{products: Product[]}>(
        '/product/products/' + category,
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  if (fetching)
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Fetching Products...</Text>
      </View>
    );

  return (
    <>
      <CategoryList
        data={categories}
        renderItem={({item}) => {
          return (
            <CategoryBtn
              active={selectedCategory === item}
              label={item}
              onPress={() => handleOnCategorySelect(item)}
            />
          );
        }}
      />
      <FlatList
        data={products}
        contentContainerStyle={styles.container}
        // horizontal
        renderItem={({item: product}) => {
          return (
            <ProductCard
              onPress={() => {
                navigation.navigate('SingleProduct', {id: product.id});
              }}
              product={product}
            />
          );
        }}
        keyExtractor={product => product.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Oops There is Nothing...</Text>
          </View>
        }
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: offset,
    // gap: 20,
  },
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
  separator: {
    width: '30%',
    height: 4,
    marginHorizontal: 'auto',
    backgroundColor: 'lightgray',
    marginVertical: 10,
  },
});

export default Home;
