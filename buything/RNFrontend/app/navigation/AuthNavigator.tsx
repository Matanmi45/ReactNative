import { createStaticNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
//import Home from '../views/Home';

export type AuthStackNavigator = {
  SignIn: undefined;
  SignUp: undefined;
};

const AuthStack = createStackNavigator<AuthStackNavigator>({
  screens: {
    SignIn,
    SignUp,
  },
  screenOptions: {
    headerShown: false,
  },
});

const AuthNavigator = createStaticNavigation(AuthStack);

export default AuthNavigator;
