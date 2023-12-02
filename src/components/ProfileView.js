import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Picture from './image'
import Label from './text'
import firestore from '@react-native-firebase/firestore';
import { FONT } from '../enums/StyleGuides';


const ProfileView = () => {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const data = firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        const users = [];
        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setProfile(users);
      });
  }, []);

  return (
    
      profile.map((item,index) =>
        <View style={styles.container} key={index}>
          <Picture source={{ uri: item.image }} style={styles.image} />
          <Label text={item.Name} textStyle={styles.heading} />
        </View>
      )
    

  )
}

export default ProfileView

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    
  },
  heading: {
    width:'100%',
    marginLeft: 10,
    fontSize: 30,
    fontFamily:FONT.heading
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  }
})