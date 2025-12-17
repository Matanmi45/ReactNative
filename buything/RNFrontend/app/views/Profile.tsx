import {FC} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useAuth} from '../context/AuthProvider';
import Icon from '@react-native-vector-icons/ant-design';
import {launchImageLibrary} from 'react-native-image-picker';
import client from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {}

const Profile: FC<Props> = () => {
  const {logout, updateProfile, profile} = useAuth();

  const openImagePicker = async () => {
    try {
      const {didCancel, assets} = await launchImageLibrary({
        mediaType: 'photo',
      });

      // console.log(JSON.stringify(result, null, 2));

      if (didCancel || !assets) return;

      const image = assets[0];

      const formData = new FormData();
      formData.append('image', {
        name: image.fileName,
        uri: image.uri,
        type: image.type,
        size: image.fileSize,
      });

      const token = await AsyncStorage.getItem('auth_token');
      const {data} = await client.post('/auth/profile-image', formData, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        },
      });
      updateProfile(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../source/pattern.jpg')}
          style={styles.bannerImage}
        />

        <Pressable onPress={openImagePicker} style={styles.profileImageSection}>
          {profile?.image ? (
            <View style={styles.profileImageContainer}>
              <Image
                source={{
                  uri: profile?.image,
                }}
                style={styles.profileImage}
              />
            </View>
          ) : (
            <View style={[styles.profileImageContainer, styles.iconContainer]}>
              <Icon name="user-add" size={40} color="white" />
            </View>
          )}
        </Pressable>
      </View>

      <Text style={styles.profileName}>{profile?.name}</Text>
      <Pressable style={styles.logoutBtn} onPress={logout}>
        <Text>Log Out</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  profileImageSection: {
    borderWidth: 6,
    borderColor: 'lightgray',
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    left: '50%',
    transform: [{translateX: '-50%'}, {translateY: '50%'}],
    bottom: 0,
    padding: 4,
    zIndex: 10,
  },
  profileImageContainer: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: 'lightgray',
    overflow: 'hidden',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  profileName: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 50,
  },
  logoutBtn: {
    alignSelf: 'center',
    paddingTop: 5,
  },
  logoutBtnText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Profile;
