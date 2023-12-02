import { StyleSheet, Modal, TouchableOpacity, View, Text, Button, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Label from './text'
import { FONT } from '../enums/StyleGuides'
import firestore from '@react-native-firebase/firestore';
import Pressable from './pressable';

const Favourites = () => {
    const [stories, setStories] = useState([]);
    const [show, setShow] = useState(false);
    const [storiesCount, setStoriesCount] = useState(0);

    useEffect(() => {
        const data = firestore()
            .collection('Stories')
            .where('like', '==', true)
            .onSnapshot(querySnapshot => {
                const users = [];
                querySnapshot.forEach(documentSnapshot => {
                    users.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                setStories(users);

                const storiesCount = querySnapshot.size;
                console.log("Number of stories:", storiesCount);
                // Do whatever you need to do with the count (e.g., set it to state)
                setStoriesCount(storiesCount);
            });
    }, []);



    const unLike = async (key) => {
        try {
            await firestore().collection('Stories').doc(key).update({ like: false });
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    }

    return (
        <View >
            <Modal
                transparent={true}
                visible={show}>
                <View style={styles.modalBox}>
                    <View style={styles.modalView}>
                        <Label text={"Favourite Stories"} textStyle={styles.heading} />
                        {
                            stories.length > 0 ? 
                            <ScrollView showsVerticalScrollIndicator={false} style={styles.storiesScrollView}>
                            {stories.map((item, index) => (
                                <View style={styles.storyContainer} key={index}>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Label text={`Category: ${item.category}`} textStyle={styles.storyHeading} />
                                        <Label text={`Story No. ${index + 1}`} textStyle={styles.storyHeading} />
                                    </View>
                                    <Label text={item.Story} textStyle={styles.text} />
                                    <View style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto', padding: '3%', marginTop: '2%' }}>
                                        <Button title={"Remove From Favourite"} color="red" onPress={() => unLike(item.key)} />
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                        : null

                        }
                        
                        <Pressable title={"Close"} onPress={() => setShow(false)} labelStyle={styles.updateLabel} buttonStyle={styles.closeView} />
                    </View>


                </View>
            </Modal>
            <TouchableOpacity style={styles.editView} onPress={() => setShow(true)}>
                <Label text={`Favourite Stories ( ${storiesCount} )`} textStyle={styles.label} />
            </TouchableOpacity>
        </View>
    )
}

export default Favourites

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'space-between'
    },
    modalBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: '5%',
    },
    modalView: {
        width: "100%",
        height: "100%",
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
        elevation: 10,
    },
    editView: {
        marginHorizontal: '10%',
        width: '80%'
    },
    label: {
        fontSize: 20,
        fontFamily: FONT.heading,
        textAlign: 'center',
        marginBottom: '1%',
        backgroundColor: 'black',
        color: 'white',
        margin: '2%',
        padding: '5%',
        borderRadius:10,
    },
    heading: {
        textAlign: 'center',
        fontSize: 28,
        fontFamily: FONT.heading
    },
    updateView: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginVertical: '5%',
    },
    storyHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    storiesScrollView: {
        flex: 1,
        width: '100%',
        marginTop: '5%',
    },
    storyContainer: {
        margin: '2%',
        padding: '2%',
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        lineHeight: 25,
        textAlign: 'justify',
    },

})