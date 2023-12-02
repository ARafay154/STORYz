import { StyleSheet, TextInput, View, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FONT } from '../enums/StyleGuides';
import Pressable from './pressable';
import firestore from '@react-native-firebase/firestore';

const NewStory = (props) => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [category, setCateogry] = useState('');

    useEffect(() => {
        setCateogry(props.category)
    },)


    const SaveStory = async () => {
        try {
            setLoading(true);
            await firestore()
                .collection('Stories')
                .add({
                    Story: text,
                    category: category,
                })
                .then(() => {
                    setLoading(false)
                    Alert.alert("New Story Save")
                });
        } catch (error) {
            Alert.alert("Something Wrong")
            setLoading(false)
        }
    }
    return (

        <View style={styles.container}>
            <TextInput
                style={styles.textArea}
                placeholder="Type here..."
                placeholderTextColor="#a9a9a9"
                multiline={true}
                numberOfLines={20} // Set the number of lines you want to display initially
                onChangeText={(value) => setText(value)}
                value={text}
            />
            {
                loading ? <View style={{marginVertical:'5%'}}><ActivityIndicator size={50} color='purple' /></View>
                    : <Pressable title={"Save"} onPress={() => SaveStory()} labelStyle={styles.saveLabel} buttonStyle={styles.saveView} />
            }

        </View>
    )
}

export default NewStory

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '45%',
        padding: '1%',
        marginBottom: '5%'

    },
    textArea: {
        width: '100%',
        height: "75%",
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 20,
        textAlignVertical: 'top',
        fontFamily: FONT.text
    },
    saveView: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginVertical: '2%'
    }
})