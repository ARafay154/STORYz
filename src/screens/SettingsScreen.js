import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { AboutUs, DeleteProfile, EditProfile, Favourites, Label, ProfileView, RecycleBin, } from '../components';
import { FONT } from '../enums/StyleGuides';

const SettingsScreen = ({ navigation }) => {
 
  return (
    <LinearGradient colors={["#ffffff", "#4bcffa",]} style={styles.container}>
      <Label text={"SETTINGs"} textStyle={styles.heading} />
      <ProfileView />
      <View>
        <EditProfile />
        <AboutUs />
        <Favourites />
        <RecycleBin />
        <DeleteProfile navigation={navigation} />
      </View>

    </LinearGradient>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center'
  },
  heading: {
    textAlign: 'center',
    letterSpacing: 10,
    fontFamily: FONT.heading,
  }

})