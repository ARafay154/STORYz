import { StyleSheet, Modal, TouchableOpacity, View, ScrollView, } from 'react-native'
import React, { useState } from 'react'
import Label from './text'
import { FONT } from '../enums/StyleGuides'
import Pressable from './pressable';
import Picture from './image';



const AboutUs = () => {
    const [show, setShow] = useState(false);
    const team = [
        {
            "name": "John Doe",
            "image": require('../assets/images/membersImage.png'),
            "position": "Founder & CEO",
            "bio": "John is passionate about literature and started STORYz with the vision of creating a platform to share and enjoy stories."
        },
        {
            "name": "Jane Smith",
            "image": require('../assets/images/membersImage.png'),
            "position": "Head of Content",
            "bio": "Jane curates and manages the vast collection of stories available on STORYz, ensuring a wide variety of quality content for users."
        },
        {
            "name": "Alex Johnson",
            "image": require('../assets/images/membersImage.png'),
            "position": "Lead Developer",
            "bio": "Alex leads the development team, working tirelessly to enhance the app's functionality and user experience."
        }
    ]

    return (
        <View >
            <Modal
                transparent={true}
                visible={show}>

                <View style={styles.modalBox}>
                    <View style={styles.modalView}>
                        <Label text={"STORYz"} textStyle={styles.title} />
                        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', height: '60%', backgroundColor: 'white' }}>
                            <Label text={"Welcome to STORYz, a platform that brings captivating stories from various genres to your fingertips."} textStyle={styles.text} />
                            <Label text={"Our mission is to inspire imagination and foster a love for storytelling by providing a diverse collection of engaging stories."} textStyle={styles.text} />
                            <Label text={"Team Memebrs"} textStyle={styles.subtitle} />
                            {
                                team.map((item, index) => (
                                    <View key={index} style={styles.team}>
                                        <Picture source={item.image} style={styles.image} />
                                        <Label text={item.name} textStyle={[styles.text, { color: 'white' }]} />
                                        <Label text={item.position} textStyle={[styles.text, { color: 'white' }]} />
                                        <Label text={item.bio} textStyle={[styles.text, { color: 'white' }]} />
                                    </View>
                                ))
                            }
                            <Label text={"Contact Us"} textStyle={styles.subtitle} />
                            <Label text={"StoryzApp@gmail.com"} textStyle={styles.text} />
                        </ScrollView>
                        <Pressable title={"Close"} onPress={() => setShow(false)} labelStyle={styles.updateLabel} buttonStyle={styles.closeView} />
                    </View>
                </View>
            </Modal>
            <TouchableOpacity style={styles.editView} onPress={() => setShow(true)}>
                <Label text={"About Us"} textStyle={styles.label} />
            </TouchableOpacity>
        </View>
    )
}

export default AboutUs

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'space-between'
    },
    modalBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: "90%",
        height: "90%",
        backgroundColor: 'white',
        justifyContent: 'space-around',
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
    title: {
        textAlign: 'center',
        fontFamily: FONT.heading,
        letterSpacing: 10,
        marginVertical: '2%',
    },
    text: {
        fontSize: 20,
        fontFamily: FONT.text,
        textAlign: 'center',
        marginVertical: '1%'
    },
    team: {
        backgroundColor: 'grey',
        margin: '1%',
        borderRadius:10,
        padding:'2%'
    },
    subtitle: {
        fontSize: 25,
        textAlign: 'center',
        fontFamily: FONT.heading,
        marginVertical: '2%',
    },
    image:{
        marginLeft:'auto',
        marginRight:'auto'
    }


})