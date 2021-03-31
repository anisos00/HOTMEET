import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import { useDispatch } from 'react-redux';

import * as postActions from '../../store/actions/posts';
import ImgPicker from '../../components/app/PostPicker';
import Colors from '../../constants/Colors';
import { showMessage } from "react-native-flash-message";


const AddPostScreen = (props) => {

    const [clearPickedImage, setClearPickedImage] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [base64Data, setBase64Data] = useState('');
    const [imageType, setImageType] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    // clears all the fields
    const clearForm = () => {
        setClearPickedImage(true);
        setTitle('');
      
        setBase64Data('');
        setImageType('');
        setIsLoading(false);
    }

    

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', clearForm);

        return () => {
            unsubscribe();
        };
    }, [clearForm])


    //checks if the post is valid to be posted
    const validatePost = () => {
        let strLength = base64Data.length;
        let sizeInBytes = 4 * Math.ceil((strLength / 3)) * 0.5624896334383812;
        let sizeInKb = sizeInBytes / 1000;
        console.log(sizeInKb);
        if (sizeInKb > 2000) {
            showMessage({
                message: "Image size should be less than 150KB.",
                type: "danger",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }


        if (!title || title.length === 0) {
            showMessage({
                message: "Please enter a title.",
                type: "danger",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        
        if (base64Data.length === 0) {
            showMessage({
                message: "Please select an image to post.",
                type: "danger",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }

        return true;
    }


    //create post function
    const createPost = async () => {
        setIsLoading(true);
        if (validatePost()) {
            console.log("VALID POST")
            try {
                await dispatch(postActions.createPost(title, body, base64Data, imageType));
                clearForm();
                props.navigation.navigate('AllPosts')
                showMessage({
                    message: "Your post was successfully created.",
                    type: "success",
                    duration: 3000,
                    icon: { icon: "success", position: 'left' }
                });
            } catch (error) {
                showMessage({
                    message: error.message,
                    type: "danger",
                    duration: 3000,
                    icon: { icon: "danger", position: 'left' }
                });
                console.log("ERROR ", error.message);
            }
        }
        setIsLoading(false);
    }

    //image picker function
    const imagePickedHandler = (base64, imageType) => {
        setBase64Data(base64);
        setImageType(imageType);
    }

    return (
        <ScrollView style={{ backgroundColor: "#000" }}  >
            <KeyboardAvoidingView style={styles.screen}  >
                <View style={styles.container}>



                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Title"
                            underlineColorAndroid='transparent'
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                        />
                    </View>

                    
                    <ImgPicker
                        onImageTaken={imagePickedHandler}
                        clearPickedImage={clearPickedImage}
                    />
                    <TouchableOpacity
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={createPost}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.loginText}>
                                Post
                            </Text>
                        )}

                    </TouchableOpacity>


                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};


export const screenOptions = {
    headerTitle: 'Create Post'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',


    },
    container: {
        flex: 1,
        marginTop: 40,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#000",

    },

    errorMsgContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#D8000C',
        backgroundColor: "#FFBABA",
        color: "#D8000C",
        borderRadius: 25,
    },
    msgText: {
        fontSize: 15,
    },
    msgIcon: {
        width: 30,
        height: 30,
        // marginLeft: 15,
        justifyContent: 'center'
    },

    inputContainer: {
        //borderColor: 'grey',
        backgroundColor: '#111',
        borderRadius: 5,

        width: 300,
        height: 50,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',

    },
    inputs: {

        marginLeft: 16,


        color: '#FFFFFF',
        fontSize: 20,


    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
        width: 300,

        backgroundColor: 'transparent'
    },
    loginButton: {
        backgroundColor: Colors.gold_brown,

    },
    loginText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
    },
})

export default AddPostScreen;