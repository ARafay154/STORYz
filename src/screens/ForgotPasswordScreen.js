import { StyleSheet, View, Alert } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { CustomInput, IconPressable, Label, Pressable } from '../components';
import { FONT } from '../enums/StyleGuides';
import auth from '@react-native-firebase/auth';
import { SCREEN } from '../enums/AppEnums';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);

  const resetPassword = () => {
    if (email != null) 
    {
      auth().sendPasswordResetEmail(email)
      .then(function (user) {
        navigation.navigate(SCREEN.LOGIN)
        Alert.alert('Please check your email...')
      }).catch(function (e) {
        console.log(e)
      })
    } else {
      Alert.alert("Please enter a valid email")
    }

  }

  return (
    <LinearGradient colors={["#ffffff", "#4bcffa",]} style={styles.container}>
      <View style={styles.form}>
        <Label text={"Forget Password"} textStyle={styles.heading} />
        <Label text={"Enter your email, we will send you reset link"} textStyle={styles.subheading} />
        <CustomInput placeholder="Email" placeholderTextColor={'black'} onChangeText={(text) => setEmail(text)} value={email} style={styles.input} />
        <Pressable title={"Send"} onPress={() => resetPassword()} labelStyle={styles.sendLabel} buttonStyle={styles.sendView} />
        <IconPressable library="Ionicons" name="return-down-back" size={50} color="black" style={styles.icon} onPress={() => navigation.goBack()} />
      </View>
    </LinearGradient>
  )
}

export default ForgotPasswordScreen

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
    padding: "5%",
    position: 'relative'
  },
  heading: {
    fontSize: 35,
    fontFamily: FONT.heading,
    marginBottom: '1%'
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: FONT.text,
    marginBottom: '5%',
    textAlign: 'center'
  },
  sendView: {
    marginVertical: '5%'
  },
  icon: {
    position: 'absolute',
    bottom: '0%',
    left: '2%',
    alignItems: 'center',
  }
})