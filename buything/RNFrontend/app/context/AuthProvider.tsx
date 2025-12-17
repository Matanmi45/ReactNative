import AsyncStorage from '@react-native-async-storage/async-storage';
import {FC, ReactNode, useContext, useEffect, useState} from 'react';
import {createContext} from 'react';
import client from '../api/client';
import {Text, View} from 'react-native';

// Context

type Profile = {id: string; name: string; email: string; image?: string};

type SignInInfo = {email: string; password: string};

interface DefaultAuthContext {
  isAuth: boolean;
  profile: Profile | null;
  logout(): void;
  login(value: SignInInfo): void;
  updateProfile(value: Profile): void;
}

export const AuthContext = createContext<DefaultAuthContext>({
  isAuth: false,
  profile: null,
  logout() {},
  login() {},
  updateProfile() {},
});

interface Props {
  children: ReactNode;
}

const AuthProvider: FC<Props> = ({children}) => {
  const [busy, setBusy] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [profile, setProfile] = useState<DefaultAuthContext['profile']>(null);

  useEffect(() => {
    const readTokenFromAsyncStorage = async () => {
      const result = await AsyncStorage.getItem('auth_token');
      if (result) {
        const {data} = await client.get('/auth/is-auth', {
          headers: {
            Authorization: 'Bearer ' + result,
          },
        });
        setIsAuth(true);
        setProfile(data.profile);
      }
    };

    readTokenFromAsyncStorage().finally(() => {
      setBusy(false);
    });
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('auth_token');
    setIsAuth(false);
  };

  const updateProfile = async (value: Profile) => {
    setProfile(value);
  };

  const login = async (value: SignInInfo) => {
    const {data} = await client.post(`/auth/sign-in`, value);
    await AsyncStorage.setItem('auth_token', data.token);
    setIsAuth(true);
  };

  return (
    <AuthContext.Provider
      value={{isAuth, profile, updateProfile, logout, login}}>
      {busy ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Fetching Auth Info...</Text>
        </View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
