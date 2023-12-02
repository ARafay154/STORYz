import { StyleSheet,Pressable } from 'react-native'
import React,{memo} from 'react'
import CustomIcon from '../customIcon'

const IconPressable = ({ onPress, library, name, size, color,style }) => {
  return (
    <Pressable onPress={onPress} style={[styles.icon, style]}>
      {({ pressed }) => (
        <CustomIcon library={library} name={name} size={size} color={color} />
      )}
    </Pressable>
  )
}

export default memo(IconPressable)

const styles = StyleSheet.create({})