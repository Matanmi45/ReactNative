import { FC, useState } from 'react';
//import { StyleSheet } from 'react-native';
import FormContainer from '../components/FormContainer';
import FormInput from '../components/FormInput';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackNavigator } from '../navigation/AuthNavigator';
import { AxiosError } from 'axios';
import ErrorMessage from '../components/ErrorMessage';
import client from '../api/client';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthProvider';
interface Props {}

export type errorType = Record<string, string[] | undefined>;
const SignUp: FC<Props> = () => {
  const [signUpInfo, setSignUpInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<errorType>({});
  const [error, setError] = useState<string>('');
  const navigation = useNavigation<NavigationProp<AuthStackNavigator>>();
  const { login } = useAuth();

  const handleSubmit = async () => {
    setError('');
    setErrors({});
    try {
      await client.post(`/auth/sign-up`, signUpInfo);
      // if we got the response back it means we are signed up
      login({ email: signUpInfo.email, password: signUpInfo.password });
      // eslint-disable-next-line no-catch-shadow, @typescript-eslint/no-shadow
    } catch (error: any) {
      if (error instanceof AxiosError) {
        // this is the error coming from api
        console.log('error re is :', error.request);
        const responseData = error.response?.data;
        console.log('responseData is :', responseData);
        if (responseData.errors) setErrors(responseData.errors);
        if (responseData.error) setError(responseData.error);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <FormContainer
      onLinkPress={() => {
        navigation.navigate('SignIn');
      }}
      onSubmit={handleSubmit}
      btnTitle="Sign Up"
      navLinkTitle="I already have an account?"
    >
      {error ? <ErrorMessage size={18} message={error} /> : null}
      <FormInput
        label="Name"
        placeholder="John Doe"
        errors={errors.name}
        onChangeText={name => {
          setSignUpInfo({ ...signUpInfo, name });
        }}
      />
      <FormInput
        label="Email"
        placeholder="email@example.com"
        autoCapitalize="none"
        errors={errors.email}
        keyboardType="email-address"
        onChangeText={email => {
          setSignUpInfo({ ...signUpInfo, email });
        }}
      />
      <FormInput
        label="Password"
        placeholder="*********"
        secureTextEntry
        autoCapitalize="none"
        errors={errors.password}
        onChangeText={password => {
          setSignUpInfo({ ...signUpInfo, password });
        }}
      />
    </FormContainer>
  );
};

// const styles = StyleSheet.create({
//   container: {},
// });

export default SignUp;
