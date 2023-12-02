import { StyleSheet, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { CustomInput, IconPressable, Label, Picture, Pressable } from '../components';
import { FONT } from '../enums/StyleGuides';
import ImagePicker from 'react-native-image-crop-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { SCREEN } from '../enums/AppEnums';
import LottieView from 'lottie-react-native';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snap, setSnap] = useState('');
  const [loading, setLoading] = useState(false);
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      // console.log('Selected image:', image); // Log the selected image
      setSnap(image); // Update the snap state
    }).catch(error => {
      // console.error('Image selection error:', error);
    });
  }

  const saveData = async () => {
    try {
      setLoading(true);
      const reference = storage().ref(`/ProfilePhotos/${name + " ProfilePhoto"}`);
      const pathToFile = snap.path
      await reference.putFile(pathToFile);
      const url = await storage().ref(`/ProfilePhotos/${name + " ProfilePhoto"}`).getDownloadURL();
      console.log(url)
      await firestore()
        .collection('Users')
        .add({
          Name: name,
          Email: email,
          Password: password,
          image: url,
        })
        .then(() => {
          console.log('Data upload');
          const isUsercreated = auth().createUserWithEmailAndPassword(email, password);
          console.log(isUsercreated)
          Alert.alert("Account Created")
          setLoading(false);
          navigation.navigate(SCREEN.LOGIN)
        })
    } catch (error) {
      console.log('SignUp Error')
      setLoading(false)
    }
  }
  return (
    <LinearGradient colors={["#ffffff", "#4bcffa",]} style={styles.container}>
      {
        loading ? <LottieView
          style={{ width: "100%", height: "30%", }}
          source={require('../assets/animations/Loading.json')} autoPlay loop />
          :
          <View style={styles.form}>
            <Label text={"Create Account"} textStyle={styles.heading} />
            {
              snap ? <TouchableOpacity onPress={() => openGallery()}><Picture source={{ uri: snap.path }} style={styles.image} /></TouchableOpacity>
                : <IconPressable library="MaterialCommunityIcons" name="camera-plus" size={75} color="black" style={{ marginBottom: '5%' }} onPress={() => openGallery()} />
            }
            <CustomInput placeholder="Full Name" placeholderTextColor={'black'} onChangeText={(text) => setName(text)} value={name} style={styles.input} />
            <CustomInput placeholder="Email" placeholderTextColor={'black'} onChangeText={(text) => setEmail(text)} value={email} style={styles.input} />
            <CustomInput placeholder="Password" placeholderTextColor={'black'} onChangeText={(text) => setPassword(text)} value={password} style={styles.input} />
            <Pressable title={"Sign Up"} onPress={() => saveData()} labelStyle={styles.signUpLabel} buttonStyle={styles.signUpView} />
            <IconPressable library="Ionicons" name="return-down-back" size={50} color="black" style={styles.icon} onPress={() => navigation.goBack()} />
          </View>
      }
    </LinearGradient>
  )
}
export default SignUpScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: "3%"
  },
  form: {
    width: "100%",
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 6,
    borderRightWidth: 6,
    padding: "2%",
    position: 'relative'
  },
  heading: {
    fontSize: 40,
    fontFamily: FONT.heading,
    marginVertical: '5%'
  },
  signUpView: {
    marginVertical: '7%'
  },
  icon: {
    position: 'absolute',
    bottom: '0%',
    left: '2%',
    alignItems: 'center',
  },
})
