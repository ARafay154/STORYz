import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { CATEGORIES } from '../dummyData/DummyData';
import { Header, Label, Picture } from '../components';
import { FONT } from '../enums/StyleGuides';
import { SCREEN } from '../enums/AppEnums';

const HomeScreen = ({ navigation }) => {
  const data = CATEGORIES;
  return (
    <LinearGradient colors={["#ffffff", "#4bcffa",]} style={styles.container}>
      <Header show={false} navigation={navigation} />
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) =>
          <TouchableOpacity style={styles.proItem} onPress={() => navigation.navigate(SCREEN.STORY, { category: item.category_name })}>
            <Picture source={item.image} style={styles.image} />
            <Label text={item.category_name} textStyle={styles.name} />
          </TouchableOpacity>
        }
      />
    </LinearGradient>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    padding: "3%",
  },
  proItem: {
    width: '46%',
    margin: "2%",
    paddingBottom: '1%',
    elevation: 1,
  },
  image: {
    width: '98%',
    height: 100,
    objectFit: 'cover',
    borderRadius: 2,
    marginVertical: '2%'
  },
  name: {
    fontSize: 20,
    fontFamily: FONT.heading,
    textAlign: 'center',
    marginBottom: '1%',
    backgroundColor: 'black',
    color: 'white',
    margin: '2%'
  },
})