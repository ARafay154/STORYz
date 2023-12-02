import { StyleSheet, Image } from 'react-native'
import React,{memo} from 'react'

const Picture = ({source,style}) => {
  return (
    <Image 
    source={source}
    style={[styles.image,style]}/>
  )
}

export default memo(Picture)

const styles = StyleSheet.create({
    image: {
        width: 125,
        height: 125,
        borderRadius:100,
        backgroundColor:'red',
        marginVertical:'5%'
      },
})