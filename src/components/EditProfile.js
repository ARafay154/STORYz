import { StyleSheet, Modal, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Label from './text'
import { FONT } from '../enums/StyleGuides'
import firestore from '@react-native-firebase/firestore';
import CustomInput from './input';
import Picture from './image';
import IconPressable from './iconPressable';
import Pressable from './pressable';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';



const EditProfile = () => {
    const [profile, setProfile] = useState([]);
    const [show, setShow] = useState(false);
    const [updatedName, setUpdatedName] = useState('');
    const [snap, setSnap] = useState('');
    const [loading, setLoading] = useState(false);

    // const [imageUri, setImageUri] = useState('');


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

    const Update = async (key) => {
        try {
            if (updatedName) {
                await firestore().collection('Users').doc(key).update({ Name: updatedName });
                console.warn("Name Updated")
            }
    
            setLoading(true);
    
            if (snap && snap.path) {
                const user = profile[0];
                const imageName = `${user.Name}_ProfilePhoto`;
                const reference = storage().ref(`/ProfilePhotos/${imageName}`);
                const pathToFile = snap.path;
    
                try {
                    await reference.putFile(pathToFile);
                    const url = await reference.getDownloadURL();
    
                    await firestore().collection('Users').doc(user.key).update({
                        image: url,
                    });
    
                    setLoading(false);
                } catch (error) {
                    console.error('Error updating image:', error);
                    setLoading(false);
                }
            } else {
                console.log('Snap data not available or incomplete');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };
    



    const openGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true,
        }).then(image => {
            // console.log('Selected image:', image); // Log the selected image
            setSnap(image); // Update the snap state
        }).catch(error => {
            // console.error('Image selection error:', error);
            setLoading(false)
        });
    };


    return (
        <View >
            <Modal
                transparent={true}
                visible={show}>
                <View style={styles.modalBox}>
                    {profile.map((item, index) =>
                        <View style={styles.modalView} key={index}>
                            <Label text={"Edit Account"} textStyle={styles.heading} />
                            {
                                loading ? (<View><ActivityIndicator size={100} color='red' /></View>)
                                    : (<View style={{ alignItems: 'center' }}>
                                        <Picture source={{ uri: item.image }} style={styles.image} />
                                        <IconPressable library="FontAwesome6" name="camera-rotate" size={50} color="black" style={styles.icon} onPress={() => openGallery()} />
                                    </View>)
                            }

                            <CustomInput placeholder="Full Name" placeholderTextColor={'black'} onChangeText={(text) => setUpdatedName(text)} value={updatedName || item.Name} style={styles.input} />
                            <Pressable title={"Update"} onPress={() => Update(item.key)} labelStyle={styles.updateLabel} buttonStyle={styles.updateView} />
                            <Pressable title={"Close"} onPress={() => setShow(false)} labelStyle={styles.updateLabel} buttonStyle={styles.closeView} />
                        </View>
                    )
                    }
                </View>
            </Modal>
            <TouchableOpacity style={styles.editView} onPress={() => setShow(true)}>
                <Label text={"Profile Edit"} textStyle={styles.label} />
            </TouchableOpacity>
        </View>
    )
}

export default EditProfile

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
        width: "80%",
        height: "auto",
        backgroundColor: 'white',
        justifyContent: 'space-around',
        padding: 10,
        borderRadius: 5,
        elevation: 10,
    },
    editView: {
        marginHorizontal: '10%',
        width: '80%',
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

    }

})