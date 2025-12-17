import {FC, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import client from '../api/client';
import {HomeNavigatorProps} from '../navigation/HomeNavigator';
import ProductPrice from '../components/ProductPrice';
import {formatPrice} from '../utils/helper';
import PrimaryButton from '../components/PrimaryButton';
import Icon from '@react-native-vector-icons/ant-design';
import {Product, useCart} from '../context/CartProvider';
import {useFavorite} from '../context/FavoriteProvider';

type Props = StackScreenProps<HomeNavigatorProps, 'SingleProduct'>;

const {width} = Dimensions.get('screen');
const padding = 10;
const imageSize = width - 10 * 2;
const SingleProduct: FC<Props> = ({route}) => {
  const productId = route.params.id;
  const [product, setProduct] = useState<Product>();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const cartContext = useCart();
  const favContext = useFavorite();

  const onViewableItemsChanged = useRef(
    (info: {
      viewableItems: ViewToken<string>[];
      changed: ViewToken<string>[];
    }) => {
      const activeIndex = info.viewableItems[0]?.index;
      if (activeIndex !== undefined && activeIndex !== null)
        setCurrentSlideIndex(activeIndex);
    },
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const {data} = await client.get<{product: Product | null}>(
          '/product/detail/' + productId,
        );
        if (data.product) {
          setProduct(data.product);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product)
    return (
      <View style={styles.container}>
        <Text>No Product Detail Found!</Text>
      </View>
    );

  const images = [product.poster, ...product.images];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <FlatList
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          data={images}
          renderItem={({item}) => {
            return (
              <Image
                source={{uri: item}}
                style={{width: imageSize, height: imageSize, borderRadius: 8}}
                resizeMode="cover"
              />
            );
          }}
          onViewableItemsChanged={onViewableItemsChanged.current}
          viewabilityConfig={viewabilityConfig.current}
        />

        <View style={styles.images}>
          {images.map((item, index) => {
            return (
              <Image
                key={item + index}
                source={{uri: item}}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 8,
                  transform: [{scale: index === currentSlideIndex ? 1 : 0.5}],
                }}
                resizeMode="cover"
              />
            );
          })}
        </View>
      </View>
      <Text style={styles.title}>{product.title}</Text>
      <ProductPrice
        mrp={formatPrice(product.price.mrp)}
        sale={formatPrice(product.price.sale)}
      />
      <Text style={styles.text}>{product.description}</Text>
      <View style={styles.bulletPoints}>
        <Text style={styles.keyTitle}>Key Features</Text>

        {product.bulletPoints.map(point => {
          return (
            <View style={styles.points} key={point}>
              <View style={styles.bullet} />
              <Text style={styles.text}>{point}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.buttonContainer}>
        <PrimaryButton style={{flex: 1}} title="Buy Now" />

        <View style={styles.actionButtonsWrapper}>
          <Pressable
            onPress={() => cartContext?.updateCart(product, 1)}
            style={styles.actionButton}>
            <Icon name="shopping-cart" size={20} color="white" />
          </Pressable>
          <Pressable
            onPress={() => favContext?.updateFavorite(product)}
            style={styles.actionButton}>
            <Icon
              name="heart"
              size={20}
              color={favContext?.isFav(product) ? 'yellow' : 'white'}
            />
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding,
    gap: 20,
  },
  images: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  bulletPoints: {
    gap: 10,
  },
  keyTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  text: {
    fontSize: 16,
  },
  points: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 10,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionButtonsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SingleProduct;
