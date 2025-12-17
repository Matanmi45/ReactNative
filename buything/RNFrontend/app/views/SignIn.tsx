import {FC, useState} from 'react';
import FormInput from '../components/FormInput';
import FormContainer from '../components/FormContainer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackNavigator} from '../navigation/AuthNavigator';
import {errorType} from './SignUp';
import axios, {AxiosError} from 'axios';
import client from '../api/client';
import ErrorMessage from '../components/ErrorMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../context/AuthProvider';

interface Props {}

const SignIn: FC<Props> = () => {
  const [signInInfo, setSignInInfo] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<errorType>({});
  const [error, setError] = useState('');
  const navigation = useNavigation<NavigationProp<AuthStackNavigator>>();
  const {login} = useAuth();

  const handleSubmit = async () => {
    setError('');
    setErrors({});
    try {
      await login(signInInfo);
    } catch (error) {
      if (error instanceof AxiosError) {
        // this is the error coming from api
        const responseData = error.response?.data;
        if (responseData.errors) setErrors(responseData.errors);
        if (responseData.error) setError(responseData.error);
      }
    }
  };

  return (
    <FormContainer
      onLinkPress={() => {
        navigation.navigate('SignUp');
      }}
      onSubmit={handleSubmit}
      btnTitle="Sign In"
      navLinkTitle="Don't have an account?">
      {error ? <ErrorMessage message={error} size={18} /> : null}
      <FormInput
        label="Email"
        placeholder="email@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
        errors={errors.email}
        onChangeText={email => {
          setSignInInfo({...signInInfo, email});
        }}
      />
      <FormInput
        label="Password"
        placeholder="*********"
        secureTextEntry
        autoCapitalize="none"
        errors={errors.password}
        onChangeText={password => {
          setSignInInfo({...signInInfo, password});
        }}
      />
    </FormContainer>
  );
};

export default SignIn;
