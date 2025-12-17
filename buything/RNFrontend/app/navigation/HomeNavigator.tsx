//import {createStaticNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
import Home from '../views/Home';
import SingleProduct from '../views/SingleProduct';

export type HomeNavigatorProps = {
  Home: undefined;
  SingleProduct: { id: number | string };
};

const HomeStack = createStackNavigator<HomeNavigatorProps>({
  screens: {
    Home,
    SingleProduct,
  },
  screenOptions: {
    headerShown: false,
  },
});

export default HomeStack;
