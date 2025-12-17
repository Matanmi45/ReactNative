import {FC, useEffect} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useCart} from '../context/CartProvider';
import {useNavigation} from '@react-navigation/native';
import {formatPrice} from '../utils/helper';
import EmptyContainer from '../components/EmptyContainer';

interface Props {}

const Cart: FC<Props> = () => {
  const cartContext = useCart();
  const cartItemsCount = cartContext?.countAllItems();

  const navigation = useNavigation();

  useEffect(() => {
    let tabBarBadge: string | undefined = undefined;
    if (cartItemsCount)
      tabBarBadge = cartItemsCount <= 9 ? cartItemsCount.toString() : '9+';
    navigation.setOptions({
      tabBarBadge,
    });
  }, [navigation, cartItemsCount]);

  return (
    <View style={styles.container}>
      <FlatList
        ListEmptyComponent={<EmptyContainer text="No Items to Render..." />}
        contentContainerStyle={styles.listContainer}
        data={cartContext?.items}
        renderItem={({item}) => {
          return (
            <View style={styles.productContainer}>
              <Image
                resizeMode="cover"
                source={{uri: item.product.poster}}
                style={styles.productImage}
              />

              <View style={styles.productDetails}>
                <Text numberOfLines={1} style={styles.productTitle}>
                  {item.product.title}
                </Text>

                <View>
                  <Text style={styles.priceText}>
                    {formatPrice(item.product.price.sale)} x {item.count}
                  </Text>
                  <Text style={styles.totalPriceText}>
                    {formatPrice(item.product.price.sale * item.count)}
                  </Text>
                </View>

                <View style={styles.quantityControls}>
                  <Pressable
                    onPress={() => cartContext?.updateCart(item.product, -1)}
                    style={styles.actionButton}>
                    <Text style={styles.textBase}>-</Text>
                  </Pressable>

                  <View style={[styles.actionButton, styles.qtyDisplay]}>
                    <Text style={styles.textBase}>{item.count}</Text>
                  </View>
                  <Pressable
                    onPress={() => cartContext?.updateCart(item.product, 1)}
                    style={styles.actionButton}>
                    <Text style={styles.textBase}>+</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          );
        }}
      />

      <View style={styles.footerContainer}>
        <Pressable onPress={cartContext?.clearCart}>
          <Text style={styles.clearCartText}>Clear Cart</Text>
        </Pressable>
        <View style={styles.totalTextWrapper}>
          <View style={styles.divider} />
          <Text style={styles.totalText}>
            Total: {formatPrice(cartContext?.countTotalPrice() || 0)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  listContainer: {
    gap: 15,
    paddingBottom: 10,
  },
  productContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  productTitle: {
    fontWeight: '600',
  },
  priceText: {
    fontWeight: '500',
    color: 'gray',
  },
  totalPriceText: {
    fontWeight: '600',
    fontSize: 18,
  },
  productDetails: {
    flex: 1,
    gap: 5,
  },
  quantityControls: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  actionButton: {
    height: 40,
    minWidth: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyDisplay: {
    backgroundColor: '#FFA500',
  },
  textBase: {
    fontSize: 16,
  },
  footerContainer: {
    // alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  totalTextWrapper: {
    // flex: 1,
  },
  divider: {
    height: 2,
    backgroundColor: 'lightgray',
    marginTop: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  clearCartText: {
    fontSize: 18,
    paddingVertical: 10,
  },
});

export default Cart;
