import { StyleSheet, Modal, TouchableOpacity, View, Button,Alert } from 'react-native'
import React, { useState } from 'react'
import Label from './text'
import { FONT } from '../enums/StyleGuides'
import auth from '@react-native-firebase/auth';
import Pressable from './pressable';
import { SCREEN } from '../enums/AppEnums';


const DeleteProfile = (props) => {
    navigation = props.navigation;

    const [show, setShow] = useState(false);

    const deleteAccount = async () => {
        try {
            const user = auth().currentUser;
            console.log(user)
            if (user) {
                await user.delete().then(()=>{
                    Alert.alert('Account deleted successfully');
                    navigation.navigate(SCREEN.SPLASHSCREEN)
                });
                
            }
        } catch (error) {
            Alert.alert('Error deleting account:', error.message);
        }
    };

    return (

        <View >
            <View style={styles.main}>
                <Modal
                    transparent={true}
                    visible={show}>
                    <View style={styles.modalBox}>
                        <View style={styles.modalView}>
                            <Pressable title={"Delete Account"} onPress={() => deleteAccount()} labelStyle={styles.updateLabel} buttonStyle={styles.updateView} />
                            <Pressable title={"Close"} onPress={() => setShow(false)} labelStyle={styles.updateLabel} buttonStyle={styles.closeView} />
                        </View>
                    </View>
                </Modal>
                <View style={styles.open}>
                    <Button color={'red'} title='Open Model' onPress={() => setShow(true)} />
                </View>
            </View>
            <TouchableOpacity style={styles.editView} onPress={() => setShow(true)}>
                <Label text={"Delete Profile"} textStyle={styles.label} />
            </TouchableOpacity>
        </View>
    )
}

export default DeleteProfile

const styles = StyleSheet.create({
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
        width: 300,
        height: 200,
        backgroundColor: 'white',
        justifyContent: 'space-around',
        padding: 10,
        borderRadius: 30,
        elevation: 10,
    },
    text: {
        fontSize: 25,
        textAlign: 'center'
    },
    open: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    updateView: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginVertical: '5%',


    }
})