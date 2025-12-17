import {FC, ReactNode} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

interface Props {
  children: ReactNode;
  btnTitle?: string;
  navLinkTitle?: string;
  onLinkPress?(): void;
  onSubmit?(): void;
}

const FormContainer: FC<Props> = ({
  children,
  btnTitle,
  navLinkTitle,
  onLinkPress,
  onSubmit,
}) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to RNative</Text>
          <Text style={styles.subTitle}>Your own online store</Text>
        </View>

        {children}

        <PrimaryButton title={btnTitle} onPress={onSubmit} />

        <View style={styles.navLinkContainer}>
          <Text onPress={onLinkPress} style={styles.navLink}>
            {navLinkTitle}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    gap: 20,
    paddingTop: 150,
  },
  titleContainer: {
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  navLinkContainer: {
    marginTop: 'auto',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navLink: {
    fontWeight: 'bold',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default FormContainer;
