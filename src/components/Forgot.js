import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React,{memo} from 'react'
import Label from './text'
import { FONT } from '../enums/StyleGuides'
import { SCREEN } from '../enums/AppEnums'

const Forgot = (props) => {
  const navigation = props.navigation;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate(SCREEN.FORGET_PASSWORD)}>
        <Label text={"Forgot Password ?"} textStyle={styles.text} />
      </TouchableOpacity>
    </View>

  )
}

export default memo(Forgot)

const styles = StyleSheet.create({
  container:{
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-end',
    marginBottom:'5%'
    
  },
  text: {
    fontSize: 16,
    fontFamily: FONT.heading,
    padding: '1%',
    marginBottom: "2%",
    
  }
})