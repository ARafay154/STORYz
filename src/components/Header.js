import { StyleSheet, Alert, View } from 'react-native'
import React from 'react'
import Label from './text'
import IconPressable from './iconPressable'
import { FONT } from '../enums/StyleGuides'
import auth from '@react-native-firebase/auth';
import { SCREEN } from '../enums/AppEnums'

const Header = (props) => {

  icon = props.show;
  navigation = props.navigation;

  const signOut = async () => {
    await auth().signOut()
    Alert.alert("You are Logout")
    navigation.navigate(SCREEN.SPLASHSCREEN)
  };

  return (
    <View style={styles.container}>
      {
        icon ? <IconPressable library="MaterialCommunityIcons" name="keyboard-backspace" size={50} color="black" style={styles.icon} onPress={() => navigation.goBack()} />
          : <IconPressable library="MaterialCommunityIcons" name="backburger" size={50} color="black" style={styles.icon} onPress={() => signOut()} />
      }
      <Label text={"STORYz"} style={styles.view} textStyle={styles.heading} />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 65,
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    paddingHorizontal: '2%',
    elevation: 5,
    backgroundColor:'white',
    marginBottom:'2%'
  },
  heading: {
    textAlign: 'center',
    letterSpacing: 10,
    fontFamily: FONT.heading
  },
  view: {
    width: '100%',

  }
})