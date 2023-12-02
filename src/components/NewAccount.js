import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React,{memo} from 'react'
import Label from './text'
import { FONT } from '../enums/StyleGuides'
import { SCREEN } from '../enums/AppEnums'

const NewAccount = (props) => {
  const navigation = props.navigation;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate(SCREEN.SIGNUP)}>
        <Label text={"Create New Account"} textStyle={styles.text} />
      </TouchableOpacity>
    </View>

  )
}

export default memo(NewAccount)

const styles = StyleSheet.create({
  container:{
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    marginTop:'3%'
    
  },
  text: {
    fontSize: 18,
    fontFamily: FONT.heading,
    padding: '1%',
    marginBottom: "2%",
    color:'red',
    textDecorationLine:'underline' 
  }
})