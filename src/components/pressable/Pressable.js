import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { ACTIVE_OPACITY, FONT } from '../../enums/StyleGuides'

const Pressable = ({ onPress, title, buttonStyle, labelStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, styles.button]} activeOpacity={ACTIVE_OPACITY}>
      <Text style={[labelStyle, styles.buttonText]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default memo(Pressable)

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#8854d0',
    borderRadius: 10,
    borderBottomWidth:5,
    borderRightWidth:4,
  },
  buttonText: {
    fontFamily: FONT.heading,
    textAlign: 'center',
    paddingVertical:'3%',
    paddingHorizontal:'12%',
    fontSize: 25,
    color: 'yellow',
  },
})