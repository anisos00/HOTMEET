import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, TouchableWithoutFeedback } from 'react-native';

import ENV from '../../env';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import VerifiedUser from '../../constants/VerifiedUser';
import { Octicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';




const ChatListItem = (props) => {
    const { user } = props;

    const [isLoading, setIsLoading] = useState(false);

    const loggedInUserId = useSelector(state => state.auth.user._id);
    const allUsers = useSelector(state => state.users.allUsers);
    const loggedInUser = allUsers.filter(u => u._id === loggedInUserId)[0];
    // currUser following list

    const dispatch = useDispatch();
    const navigation = useNavigation();





    // check user._id is in following list

    const [imageUri, setImageUri] = useState(`${ENV.apiUrl}/user/photo/${user._id}`);


    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri)
    }

    return (



        <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Chat', { user: user })}
        >
            <View style={styles.container}>

                <View style={{ height: 60, width: 60, justifyContent: 'center', alignItems: 'center' }}>

                    <ImageBackground source={{ uri: imageUri }} style={{ height: 60, width: 60 }}>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image

                                source={require('../../assets/pic_cover.png')}
                                onError={onImageErrorHandler}
                                style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }} />
                        </View>

                    </ImageBackground>
                    <View style={styles.text}>
                        <Text
                            style={styles.name}
                        >
                            {user.name + " "}
                            {
                                VerifiedUser.verifiedUsersId.includes(user._id) && <Octicons name="verified" size={18} color={Colors.brightBlue} />
                            }
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        justifyContent: 'center',
        margin: 20,
        alignItems: 'center',
    },




    text: {

        flexDirection: 'column',
        justifyContent: 'center',

    },


    img: {
        height: 50,
        width: 50,
        margin: 0
    },

    timeAgo: {
        fontSize: 12,
        color: "#696969"
    },
    name: {
        fontSize: 15,
        color: Colors.gold_brown,
        flex: 1,
    }
})

export default ChatListItem;