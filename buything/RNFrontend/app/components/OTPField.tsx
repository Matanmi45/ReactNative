import {FC, useState, useEffect} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';

interface Props {}

const OTPField: FC<Props> = () => {
  const [time, setTime] = useState(1);
  const [enableLink, setEnableLink] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (!enableLink) {
      intervalId = setInterval(() => {
        setTime(time + 1);
      }, 1000);
    }

    if (time >= 10 && intervalId) {
      clearInterval(intervalId);
      setTime(1);
      setEnableLink(true);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [time, enableLink]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {Array(4)
          .fill('')
          .map((_, index) => (
            <TextInput
              key={index}
              style={styles.input}
              keyboardType="numeric"
              placeholder={(index + 1).toString()}
            />
          ))}
      </View>
      <View style={styles.linkContainer}>
        <Text
          onPress={() => setEnableLink(false)}
          style={[styles.link, {opacity: enableLink ? 1 : 0.3}]}>
          {!enableLink ? `Wait for ${time} sec` : "Didn't get OTP!"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    gap: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 30,
    textAlign: 'center',
    fontSize: 25,
  },
  linkContainer: {
    paddingVertical: 10,
    paddingRight: 50,
    alignSelf: 'flex-end',
  },
  link: {
    fontWeight: 'bold',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
});

export default OTPField;
