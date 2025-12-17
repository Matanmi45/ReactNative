import { FC } from 'react';
import AppNavigator from './app/navigation';
//import {SafeAreaView} from 'react-native';
import Providers from './app/context/Providers';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface Props {}

const App: FC<Props> = () => {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <Providers>
        <AppNavigator />
      </Providers>
    </SafeAreaProvider>
  );
};

export default App;
