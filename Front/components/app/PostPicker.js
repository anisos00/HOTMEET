import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Alert, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons'

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { showMessage } from "react-native-flash-message";
import { LinearGradient } from 'expo-linear-gradient';

const ImgPicker = props => {

    const [pickedImage, setPickedImage] = useState(props.editImage);
    const navigation = useNavigation();


    const PostImages =
        [{ srcc: require('../../assets/btn.png') }]


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', e => {
            if (!props.editImage) {
                setPickedImage()
            }
        });

        return () => {
            unsubscribe();
        };
    }, [])


    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const takeImageHandler = async (type) => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        let image;
        try {
            if (type === 'gallery') {
                image = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    base64: true,
                    // aspect: [16, 9],
                    quality: 0.4,
                });
            } else {
                image = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    base64: true,
                    // aspect: [16, 9],
                    quality: 0.4,
                });
            }
            if (!image.cancelled) {
                setPickedImage(image);
                let res = image.uri.split('.');
                let imageExtenstion = res[res.length - 1];
                let imageType = `${image.type}/${imageExtenstion}`;

                props.onImageTaken(image.base64, imageType);

            }
        } catch (error) {
            console.log("Image Error -", error)
        }
    };

    return (
        <View style={{ margin: 30, alignSelf: 'flex-start' }} >

            <View style={{ marginBottom: 10 }} >
                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}  >Images</Text>
            </View>



            {!pickedImage ? (

                <View  >
                    <LinearGradient
                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                        /// colors={['#7B5337', '#BA984B', '#ECC966']}
                        colors={['grey', 'grey']}

                        style={{
                            height: 150,
                            width: 150, justifyContent: 'center', alignItems: 'center', borderRadius: 10
                        }}

                    >
                        <TouchableOpacity
                            style={{
                                alignItems: 'center', backgroundColor: '#0B0801', height: 149,
                                width: 149, justifyContent: 'center', borderRadius: 10
                            }}
                            onPress={
                                takeImageHandler.bind(this, 'gallery')

                            }
                        >

                            <Image
                                style={{
                                    height: 40,
                                    width: 40,
                                    margin: 5,
                                    tintColor: '#fff'

                                }}
                                source={require('../../assets/icons/plus.png')}
                            ></Image>

                        </TouchableOpacity>
                    </LinearGradient>

                </View>


            ) : (

                <View style={{ flexDirection: 'row', alignItems: 'center' }} >




                    <View style={{
                        alignItems: 'center', backgroundColor: '#111', height: 150,
                        width: 150, justifyContent: 'center', borderRadius: 10
                    }}  >


                        <Image

                            style={styles.image}
                            source={{ uri: props.previousUpdate ? `${pickedImage.uri}?${new Date(props.previousUpdate)}` : `${pickedImage.uri}` }}
                        />

                    </View>









                    <View  >
                        <LinearGradient
                            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                            colors={['grey', 'grey']}
                            style={{
                                height: 100, margin: 10,
                                width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10
                            }}

                        >
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center', backgroundColor: '#000', height: 99,
                                    width: 99, justifyContent: 'center', borderRadius: 10
                                }}
                            // onPress={
                            //  takeImageHandler.bind(this, 'gallery')}


                            >

                                <Image
                                    style={{
                                        height: 30,
                                        width: 30,
                                        margin: 5,
                                        tintColor: '#fff'

                                    }}
                                    source={require('../../assets/icons/plus.png')}
                                ></Image>

                            </TouchableOpacity>
                        </LinearGradient>

                    </View>


                </View>

            )}




        </View>
    );

};

const styles = StyleSheet.create({

    imagePreview: {
        width: 300,
        height: 300,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',



        backgroundColor: '#111'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10
    },
    buttonContainer: {
        backgroundColor: Colors.gold,
        height: 50,
        width: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginRight: 10,

        borderRadius: 30,

    },


});

export default ImgPicker;

