import { StyleSheet, TextInput } from 'react-native'
import React, { memo } from 'react'

const CustomInput = ({ placeholder, value, onChangeText, style ,secure}) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={[style, styles.input]} 
      secureTextEntry={secure}/>
  )
}

export default memo(CustomInput)

const styles = StyleSheet.create({
  input: {
    width:'100%',
    borderWidth: 1,
    marginVertical: '2%',
    paddingLeft: 20,
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
  },
})