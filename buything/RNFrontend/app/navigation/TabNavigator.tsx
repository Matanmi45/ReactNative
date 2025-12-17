import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import Home from '../views/Home';
import Cart from '../views/Cart';
//import Fav from '../views/Fav';
import Profile from '../views/Profile';
import { createStaticNavigation } from '@react-navigation/native';
////import {Text} from 'react-native';
import Icon from '@react-native-vector-icons/ant-design';
//import SingleProduct from '../views/SingleProduct';
import HomeStack from './HomeNavigator';
import FavoriteStack from './FavoriteNavigator';

const Tabs = createBottomTabNavigator({
  screens: {
    HomeNavigator: {
      screen: HomeStack,
      options: {
        headerShown: false,
        tabBarLabel: 'Home',
        tabBarIcon({ size, color }) {
          return <Icon name="home" size={size} color={color} />;
        },
      },
    },
    Cart: {
      screen: Cart,
      options: {
        tabBarIcon({ size, color }) {
          return <Icon name="shopping-cart" size={size} color={color} />;
        },
      },
    },
    Fav: {
      screen: FavoriteStack,
      options: {
        tabBarIcon({ size, color }) {
          return <Icon name="heart" size={size} color={color} />;
        },
      },
    },
    Profile: {
      screen: Profile,
      options: {
        tabBarIcon({ size, color }) {
          return <Icon name="user" size={size} color={color} />;
        },
      },
    },
  },
});

const TabNavigator = createStaticNavigation(Tabs);

export default TabNavigator;
