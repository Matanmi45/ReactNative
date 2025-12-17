import {createStackNavigator} from '@react-navigation/stack';
import Favorite from '../views/Fav';
import SingleProduct from '../views/SingleProduct';

export type FavoriteNavigatorProps = {
  Favorite: undefined;
  SingleProduct: {id: number | string};
};

const FavoriteStack = createStackNavigator<FavoriteNavigatorProps>({
  screens: {
    Favorite,
    SingleProduct,
  },
  screenOptions: {
    headerShown: false,
  },
});

export default FavoriteStack;
