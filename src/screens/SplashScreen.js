import React, { useEffect, useState } from 'react';
import { StyleSheet, } from 'react-native';
import LottieView from 'lottie-react-native';
import { Pressable, TitleSlogan } from '../components';
import LinearGradient from 'react-native-linear-gradient';
import { SCREEN } from '../enums/AppEnums';
import auth from '@react-native-firebase/auth';

const SplashScreen = ({ navigation }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      auth().onAuthStateChanged((user) => {
        if (user !== null) { // Check if user is not null
          navigation.navigate(SCREEN.TAB_BAR);
        } else {
          setShow(true);
        }
      });
    }, 2000);
  },[])


  return (
    <LinearGradient colors={["#ffffff", "#4bcffa",]} style={styles.container}>
      <LottieView
        style={{ width: "100%", height: "40%", marginVertical: '5%' }}
        source={require('../assets/animations/welcome2.json')} autoPlay loop />
      <TitleSlogan />
      {
        show ? <Pressable title={"START"} onPress={() => navigation.navigate(SCREEN.LOGIN)} labelStyle={styles.label} buttonStyle={styles.buttonView} />
          :
          null
      }
    </LinearGradient>

  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: '2%'
  },
});
