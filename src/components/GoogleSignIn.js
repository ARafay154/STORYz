import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState,useEffect,memo } from 'react'
import Label from './text'
import { FONT } from '../enums/StyleGuides'
import { SCREEN } from '../enums/AppEnums'
import CustomIcon from './customIcon'
import { GoogleSignin,statusCodes  } from '@react-native-google-signin/google-signin';


const GoogleSignIn = (props) => {
  const navigation = props.navigation;
  const [userinfo,setUserInfo]=useState(null);

  useEffect(() => {
    GoogleSignin.configure({webClientId:'671755435665-84ee4osoa6eehib7j1m129qcp9ciet4r.apps.googleusercontent.com'});
  }, [])
  
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
      setUserInfo({ usrInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  

  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => signIn()} style={styles.button}>
        <CustomIcon library="AntDesign" name="google" size={30} color="green" />
        <Label text={"Continue with Google"} textStyle={styles.text} />
      </TouchableOpacity>
    </View>
    

  )
}

export default memo(GoogleSignIn)

const styles = StyleSheet.create({
  container: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '5%',
    paddingTop:'2%',
    borderTopWidth: 2,

  },
  text: {
    fontSize: 16,
    fontFamily: FONT.text,
    fontWeight: '700',
    padding: '1%',
    marginBottom: "2%",
  },
  button:{
    display:'flex',
    flexDirection:'row',
    justifyContent:"center",
    alignItems:"center",
    elevation:1,
    padding:'2%'
  }
})