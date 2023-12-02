import { StyleSheet, View,Alert } from 'react-native'
import React, { useState,useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { CustomInput, Forgot, GoogleSignIn, Label, NewAccount, Pressable } from '../components';
import { FONT } from '../enums/StyleGuides';
import { SCREEN } from '../enums/AppEnums';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const login = async () => {
    try {
      setLoading(true)
      const UserLogin = await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate(SCREEN.TAB_BAR);
      setLoading(false)
    } catch (error) {
      Alert.alert("Check Email and Password")
      setLoading(false)
    }
  };

  return (
    <LinearGradient colors={["#ffffff", "#4bcffa",]} style={styles.container}>
      {
        loading ? <LottieView
        style={{ width: "100%", height: "30%", }}
        source={require('../assets/animations/Loading.json')} autoPlay loop />
        :
          <View style={styles.form}>
            <Label text={"Hello"} textStyle={styles.heading} />
            <Label text={"Sign in to your account"} textStyle={styles.subheading} />
            <CustomInput placeholder="Email" placeholderTextColor={'black'} onChangeText={(text) => setEmail(text)} value={email} style={styles.input} />
            <CustomInput placeholder="Password" secure={true} placeholderTextColor={'black'} onChangeText={(text) => setPassword(text)} value={password} style={styles.input} />
            <Forgot navigation={navigation} />
            <Pressable title={"Login"} onPress={() => login()} labelStyle={styles.signInLabel} buttonStyle={styles.signInView} />
            <NewAccount navigation={navigation} />
            <GoogleSignIn navigation={navigation} />
          </View>
      }
    </LinearGradient>
  )
}

export default LoginScreen

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
    padding: "2%"
  },
  forgotLabel: {
    fontSize: 14,
  },
  heading: {
    fontSize: 50,
    fontFamily: FONT.heading,
    marginBottom: '1%'
  },
  subheading: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: FONT.text,
    marginBottom: '5%'
  }
})
