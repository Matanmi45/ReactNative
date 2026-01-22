import { FC } from 'react';
// import { Text, View } from 'react-native';
import AppNavigator from './app/navigation';
//import {SafeAreaView} from 'react-native';
import Providers from './app/context/Providers';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {}

//const url = 'http://10.51.207.72:5555';
// const result = fetch(url).then(res => res.json());
const App: FC<Props> = () => {
  // const [data, setData] = useState([]);
  // const [error, setError] = useState(null);

  // const getPosts = async () => {
  //   try {
  //     const response = await fetch(url);

  //     // Fetch only rejects on network failure; must check status manually
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const json = await response.json();
  //     setData(json);
  //   } catch (err: any) {
  //     setError(err.message);
  //   } finally {
  //     console.log('Fetch attempt finished.');
  //   }
  // };

  // // Run fetch on component mount
  // useEffect(() => {
  //   getPosts();
  // }, []);
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{ flex: 1 }}>
      <Providers>
        <AppNavigator />
      </Providers>
    </SafeAreaView>
    // <View>
    //   <Text>
    //     My name is Jamiu Mufuatu, {JSON.stringify(data)} not available
    //   </Text>
    // </View>
  );
};

export default App;
