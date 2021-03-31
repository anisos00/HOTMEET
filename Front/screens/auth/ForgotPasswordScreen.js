import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { showMessage } from "react-native-flash-message";
import { Ionicons } from '@expo/vector-icons'
import * as authActions from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';

const ForgotPasswordScreen = () => {

    const [email, setEmail] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const validateAuthForm = () => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email.toLowerCase())) {
            showMessage({
                message: "Please enter a valid email.",
                type: "danger",
                icon: { icon: "danger", position: 'left' },
                duration: 3000
            });
            return false;
        }

        return true;
    }


    const AuthHandler = async () => {
        setIsLoading(true);
        if (validateAuthForm()) {
            try {
                const msg = await dispatch(authActions.forgotPassword(email))
                showMessage({
                    message: msg,
                    type: "success",
                    icon: { icon: "success", position: 'left' },
                    duration: 4000
                });
                setEmail('');
            } catch (error) {
                showMessage({
                    message: error.message,
                    type: "danger",
                    icon: { icon: "danger", position: 'left' },
                    duration: 3000
                });
            }
        }
        setIsLoading(false);
    };


    return (
        <View style={styles.container}>


            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder="Email"
                    keyboardType="email-address"
                    placeholderTextColor="#3a3a3a"
                    underlineColorAndroid='transparent'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>


            <LinearGradient
                // Button Linear Gradient
                colors={['#efb734', '#efb734', '#ffed9a', '#ffed9a', '#efb734']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            >
                <TouchableOpacity
                    style={styles.button}
                    onPress={AuthHandler}
                >

                    {isLoading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text style={styles.text}>
                            Send Link
                            <Ionicons name="ios-send" size={30} color="#000"  ></Ionicons>

                        </Text>
                    )}

                </TouchableOpacity>

            </LinearGradient>
        </View>
    );
}


export const screenOptions = (navData) => {
    return {
        headerTitle: 'Reset Password',

    }
}

const resizeMode = 'center';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
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
    successMsgContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#4F8A10',
        backgroundColor: "#DFF2BF",
        color: "#4F8A10",
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

        backgroundColor: '#141414',

        borderWidth: 1,
        width: 300,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',

        shadowColor: "#fff",

        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 50,
        shadowRadius: 3.84,

        elevation: 5
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        color: '#ffed9a',
        flex: 1,
        fontSize: 20,

    },
    inputIcon: {
        width: 30,
        height: 30,
        marginRight: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 300,
        borderRadius: 30,
        backgroundColor: 'transparent'
    },
    btnForgotPassword: {
        height: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 10,
        width: 300,
        backgroundColor: 'transparent'
    },
    loginButton: {
        backgroundColor: "#00b5ec",

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
    },
    registerButton: {
        backgroundColor: Colors.lightPrimary,

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
    },
    loginText: {
        color: 'white',
    },
    bgImage: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    btnText: {
        color: "white",
        fontWeight: 'bold'
    },
    button: {

        alignItems: 'center',
        height: 48,
        width: 300,
        borderColor: '#633826',
        borderWidth: 2,
    },
    text: {
        textAlign: 'center',

        fontSize: 28,
        color: '#000',
    }
});


export default ForgotPasswordScreen;