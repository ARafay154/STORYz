import { StyleSheet,} from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Header, Label, NewStory, Pressable, StoryView } from '../components';


const StoryScreen = ({ navigation, route }) => {
    const category = route.params.category
    const [newShow,setNewShow]=useState(false);

    const toggleNewStory = () => {
        setNewShow(prevState => !prevState);
      };

    return (
        <LinearGradient colors={["#ffffff", "#4bcffa",]} style={styles.container}>
            <Header show={true} navigation={navigation} />
            <Label text={category} textStyle={styles.heading} />
            {
                newShow ? <NewStory category={category}/>
                : null
            }
            <Pressable title={newShow ? "Close" : "New Story"} onPress={()=>toggleNewStory()} labelStyle={styles.newStoryLabel} buttonStyle={styles.newStoryView} />
            <StoryView category={category} />
            
        </LinearGradient>
    )
}

export default StoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "3%",
      },
      heading:{
        width:'auto',
        marginHorizontal:"2%",
        textAlign:"center",
        backgroundColor:'black',
        color:'white',
        marginVertical:'2%'
      }
})