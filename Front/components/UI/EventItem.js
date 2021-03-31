import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ImageBackground, ActivityIndicator, Platform, Alert, TouchableNativeFeedback, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons'

import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { timeDifference } from '../../helpers/timeDifference';
import Colors from '../../constants/Colors';
import ENV from '../../env';
import { useDispatch } from 'react-redux';
import * as eventActions from '../../store/actions/event';
import { showMessage } from "react-native-flash-message";
import VerifiedUser from '../../constants/VerifiedUser';

const EventItem = (props) => {
    const {event, userId} = props;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // const liked = post.likes.indexOf(userId) !== -1;

    const [isImageLoading, setIsImageLoading] = useState(true);
    const [imageUri, setImageUri] = useState('')

    const [imgWidth, setImgWidth] = useState();
    const [imgHeight, setImgHeight] = useState();


    //default image handler
    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri)
    }


    let TouchableComp = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableComp = TouchableNativeFeedback;
    }

    // messages you recieve when you are about to delete a post
    const deleteHandler = (id) => {
        Alert.alert(
            'Are you sure?', 
            'Do you really want to delete this Event?',
            [
                {text: 'No', style: 'default'},
                {
                    text: 'Yes', 
                    style: 'destructive', 
                    onPress: async () => {
                        await dispatch(eventActions.deleteEvent(id))
                        showMessage({
                            message: "Your post was successfully deleted.",
                            type: "success",
                            icon: { icon: "success", position: 'left' },
                            duration: 3000
                        });
                    }
                }
            ]
        )
    };

    // checks if we have any likes

    {/** 
    const checkLike = () => {
        let match = event.likes.indexOf(userId) !== -1;
        return match;
    }


    // like a post
    const toggleLike = async () => {
        props.toggleLikeHandler(event._id, checkLike());
    }
*/}

    // get image out of a post
    useEffect(() => {
        let imageUrl = `${ENV.apiUrl}/event/photo/${event._id}?${new Date(event.updated)}`;
        Image.getSize(imageUrl, (width, height) => {
            // calculate image width and height 
            const screenWidth = Dimensions.get('window').width
            const scaleFactor = width / screenWidth
            const imageHeight = height / scaleFactor
            setImgWidth(screenWidth);
            setImgHeight(imageHeight);
        })
    }, [])


    return (
     

   <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
   <View style={{ width: 4, height: '100%', backgroundColor: '#111', marginLeft: 35, marginRight: -23 }}>

   </View>

   <TouchableOpacity
   onPress={() =>
                    //  navigation.navigate('Event', { userId: post.postedBy._id, name: post.postedBy.name })}

            navigation.navigate('Event', { eventObject: event ,userId:userId})}
            

       style={{ width: 400, height: 250, marginBottom: 20, alignSelf: 'center' }}
    >
       <View

           style={{
               backgroundColor: "#111",
               margin: 30,
               paddingBottom: 80,
               flexDirection: 'column'

           }}

       >




           <Image
             source={{ uri: `${ENV.apiUrl}/event/photo/${event._id}?${new Date(event.updated)}` }}

             onLoad={() => setIsImageLoading(false)}
               style={{ width: '100%', height: '100%' }} >



           </Image>
           <ActivityIndicator 
                        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} 
                        animating={isImageLoading} 
                        size='large' 
                        color={Colors.brightBlue} 
                    />


           <View style={{ flexDirection: 'row' }}>


               <LinearGradient
                   start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                   colors={['#111', '#111']}
                   // colors={['#BB8319', '#E8BE38', '#F9E054']}
                   style={{
                       width: 43, height: 43, backgroundColor: 'white', alignItems: 'center',
                       justifyContent: 'center',
                       marginLeft: -30, marginTop: 10, marginBottom: -5, transform: [{ rotate: '45deg' }]
                   }}  >
                   <View

                       style={{
                           width: 41,
                           height: 41,
                           backgroundColor: '#000',
                       }}></View>


               </LinearGradient>

               {/** 
                   <Image
                       source={{ uri: event.postedByImage }}
                       style={{ width: '100%', height: '100%', borderRadius: 50, resizeMode: 'cover' }} >

                   </Image>
                   */}


               <View style={{ flexDirection: 'column', marginLeft: 15, marginTop: 5 }}>
                   <Text style={{
                       color: 'white', fontSize: 25, fontWeight: 'bold',
                   }}>
                        {event.title} 
                   </Text>


                   <Text style={{ color: '#ECC966', fontSize: 15, marginTop: 2 }}>

                       {event.place}, {event.description}
                   </Text>
               </View>







           </View>


















       </View>

   </TouchableOpacity>



</View>


);
};

   
   


   
const styles = StyleSheet.create({
    event: {
        height: 400,
        width: '100%',


        backgroundColor: '#1D1D1D'



    },
    join: {
        backgroundColor: '#111',
        borderRadius: 50,
        width: 44,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 25,


    },
    private: {
        backgroundColor: 'grey',
        borderRadius: 50,
        width: 44,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 25,


    },
    name: {



    }

});

export default EventItem;