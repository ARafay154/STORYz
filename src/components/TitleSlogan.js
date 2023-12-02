import { StyleSheet, Text, View } from 'react-native'
import React,{memo} from 'react'
import { Label, } from '../components';
import { FONT } from '../enums/StyleGuides';

const TitleSlogan = () => {
  return (
    <View style={styles.container}>
      <Label text={"STORYz"} textStyle={styles.labeltext} />
      <Label text={"Storytelling is Power"} textStyle={styles.slogan} />
    </View>
  )
}

export default memo(TitleSlogan)

const styles = StyleSheet.create({
  container: {
    height:'30%',
    alignItems:'center',
    paddingTop:'5%',

  },
  labeltext: {
    fontSize: 50,
    fontFamily: FONT.heading,
    letterSpacing: 10,
  },
  slogan: {
    fontSize: 18,
    fontFamily: FONT.heading,
    marginBottom: "5%",
  },
})
