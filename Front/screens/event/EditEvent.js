import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, Button, Switch, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, ImageBackground, KeyboardAvoidingView, Alert, TouchableNativeFeedbackBase } from 'react-native';
import Colors from '../../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';


import { LinearGradient } from 'expo-linear-gradient';



import { useNavigation } from '@react-navigation/native';

import {  Feather } from '@expo/vector-icons'

import ENV from '../../env';
import ImgPicker from '../../components/app/PostPicker';
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from 'react-redux';
import * as eventActions from '../../store/actions/event';


const EditEvent = (props) => {





    const eventId = props.route.params.eventId;
    const selectedEvent = useSelector(state => 
        state.events.allEvents.find(event => event._id === eventId)
    );
    
    const [editImage, setEditImage] = useState({
        uri: `http://10.0.2.2:5000/event/photo/${eventId}`
    });
    const [previousUpdate, setPreviousUpdate] = useState(selectedEvent.updated);
    const [title, setTitle] = useState(selectedEvent.title);
    const [description, setDescription]  = useState(selectedEvent.description);
    const [place, setPlace] = useState(selectedEvent.place);
    const [base64Data, setBase64Data] = useState('');
    const [imageType, setImageType] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const clearForm = () => {
        setClearPickedImage(true);
        setTitle('');
        setPlace('');
        setDescription('');
        setEndTime('00:00');
        setStartTime('00:00');
        setBase64Data('');
        setImageType('');
        setIsLoading(false);
    }





    const [date, setDate] = useState(new Date(1598051730000));
    const [date1, setDate1] = useState(new Date(1598051730000));

    const [showClock1, setShowClock1] = useState(false);
    const [showClock2, setShowClock2] = useState(false);



    const [dateEvent, setDateEvent] = useState('zid date fel base :3 ');
    const [startTime, setStartTime] = useState('00:00');
    const [endTime, setEndTime] = useState('00:00');

 
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    


    const navigation = useNavigation();






    const onChange1 = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowClock1(Platform.OS === 'ios');
        setDate(currentDate);


        if ((date.getHours().toString().length === 1) && (date.getMinutes().toString().length === 2)) {
            setStartTime('0' + date.getHours().toString() + ':' + date.getMinutes().toString())

        }
        else if ((date.getHours().toString().length === 2) && (date.getMinutes().toString().length === 1)) {
            setStartTime(date.getHours().toString() + ':0' + date.getMinutes().toString())

        }
        else if ((date.getHours().toString().length === 1) && (date.getMinutes().toString().length === 1)) {
            setStartTime('0' + date.getHours().toString() + ':0' + date.getMinutes().toString())

        }
        else
            return setStartTime(date.getHours().toString() + ':' + date.getMinutes().toString())


    };

    const onChange2 = (event, selectedDate) => {
        const currentDate = selectedDate || date1;
        setShowClock2(Platform.OS === 'ios');
        setDate1(currentDate);


        if ((date1.getHours().toString().length === 1) && (date1.getMinutes().toString().length === 2)) {
            setEndTime('0' + date1.getHours().toString() + ':' + date1.getMinutes().toString())

        }
        else if ((date1.getHours().toString().length === 2) && (date1.getMinutes().toString().length === 1)) {
            setEndTime(date1.getHours().toString() + ':0' + date.getMinutes().toString())

        }
        else if ((date1.getHours().toString().length === 1) && (date.getMinutes().toString().length === 1)) {
            setEndTime('0' + date1.getHours().toString() + ':0' + date1.getMinutes().toString())

        }
        else
            return setEndTime(date1.getHours().toString() + ':' + date1.getMinutes().toString())


    };



    const showMode1 = () => {
        setShowClock1(true);

    };

    const showMode2 = () => {
        setShowClock2(true);

    };


            

    
 




    //image picker functions elezmin
    const imagePickedHandler = (base64, imageType) => {
        setBase64Data(base64);
        setImageType(imageType);
    }

    // event validation 
    const validateEvent = () => {
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
                message: "Please enter a title for the event.",
                type: "warning",

                style: { backgroundColor: "black", opacity: 0.8 },
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        if (!place || place.length === 0) {
            showMessage({
                message: "Please enter a location.",
                type: "warning",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }

        if (!description || description.length === 0) {
            showMessage({
                message: "Please enter a description.",
                type: "warning",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        

        return true;
    }

    //-------------------------------------


    
    const updateEvent = async () => {
        setIsLoading(true);
        if (validateEvent()) {
            console.log("edited Event")
            Alert.alert(
                'Are you sure?', 
                'Do you really want to edit this event?',
                [
                    {text: 'No', style: 'default'},
                    {
                        text: 'Yes', 
                        style: 'destructive', 
                        onPress: async () => {
                            await dispatch(eventActions.updateEvent(eventId,title, place, description, base64Data, imageType));
                            
                            showMessage({
                                message: "Your event was successfully updated.",
                                type: "success",
                                icon: { icon: "success", position: 'left' },
                                duration: 3000
                            });
                            navigation.navigate('Events')
                        }
                    }
                ]
            )
        };

             setIsLoading(false);



    }








  



    return (



        <ScrollView  >

        <View style={styles.container}>

            <TouchableOpacity
                onPress={() => navigation.pop()}
                style={{ marginRight: '85%', marginBottom: 30 }}
            >
                <Feather
                    name="arrow-left"
                    size={20}

                    color='grey'
                />
            </TouchableOpacity>



            <View style={{ alignItems: 'flex-start', marginBottom: 50 }} >



                <Text style={{ fontSize: 23, fontWeight: 'bold', alignSelf: 'flex-start', color: '#ECC966' }} > {dateEvent} </Text>





            </View>





            <View style={{ marginBottom: 40 }}>



                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Title</Text>
                <TextInput
                    style={{
                        height: 70, width: 350, fontSize: 20, color: 'white',
                        justifyContent: "flex-start"
                    }}
                    value={title}
                    onChangeText={text => setTitle(text)}
                    underlineColorAndroid="grey"
                    placeholder="Event title "
                    placeholderTextColor="grey"

                />

            </View>






            {/** date */}
            <View style={{ marginBottom: 20, flexDirection: 'column' }}>
                <Text style={{ color: 'white', marginLeft: -45, fontSize: 25, fontWeight: 'bold' }}>Time</Text>

                <View style={{ flexDirection: 'row' }}>

                    <View style={{ alignItems: "flex-start", margin: 5 }}  >
                        <Text style={{ color: 'grey', fontSize: 20, }}>Start </Text>

                        <TouchableOpacity
                            onPress={showMode1}
                            style={{
                                height: 70, width: 120,
                                justifyContent: "center", backgroundColor: '#000', alignItems: 'center', borderWidth: 0.5,
                                borderColor: '#ECC966'
                            }}>
                            <Text style={{
                                fontSize: 35, color: 'white',
                                justifyContent: "flex-start"
                            }}>
                                {startTime}
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ alignItems: "flex-start", margin: 5 }}  >
                        <Text style={{ color: 'grey', fontSize: 20, }}>End </Text>

                        <TouchableOpacity
                            onPress={showMode2}
                            style={{
                                height: 70, width: 120,
                                justifyContent: "center", backgroundColor: '#000', alignItems: 'center', borderWidth: 0.5,
                                borderColor: '#ECC966'
                            }}>
                            <Text style={{
                                fontSize: 35, color: 'white',
                                justifyContent: "flex-start"
                            }}>
                                {endTime}
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>



            </View>






            {showClock1 && (
                <DateTimePicker

                    testID="sartTimePicker"
                    value={date}
                    mode="time"
                    is24Hour={true}
                    display="spinner"
                    onChange={onChange1}
                />
            )}
            {showClock2 && (
                <DateTimePicker

                    testID="ssartTimePicker"
                    value={date1}
                    mode="time"
                    is24Hour={true}
                    display="spinner"
                    onChange={onChange2}
                />
            )}














            <View style={{ marginBottom: 40 }}>
                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Location</Text>
                <TextInput
                    style={{
                        height: 70, width: 350, fontSize: 20, color: 'white',
                        justifyContent: "flex-start"
                    }}
                    value={place}

                    onChangeText={text => setPlace(text)}
                    underlineColorAndroid="grey"
                    placeholder="Event Location"
                    placeholderTextColor="grey"

                />


            </View>



            <View style={{ marginBottom: 20 }}>


                <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Description</Text>
                <TextInput
                    style={{
                        height: 70, width: 350, fontSize: 20, color: 'white', margin: 5, padding: 10,
                        justifyContent: "flex-start", backgroundColor: '#111'
                    }}
                    value={description}
                    onChangeText={text => setDescription(text)}
                    underlineColorAndroid="transparent"
                    placeholder="Some details.."
                    placeholderTextColor="grey"
                    numberOfLines={3}
                    multiline={true}
                />
            </View>







            <ImgPicker
                onImageTaken={imagePickedHandler} 
                        editImage={editImage}
                        previousUpdate={previousUpdate}
            />





{/** 
            <View style={{ margin: 25, alignSelf: 'flex-start' }}>
                <TouchableOpacity
                    onPress={openPanel}>
                    <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}> Privacy </Text>
                    <Text style={{ color: 'grey', fontSize: 18, }}> Choose Privacy </Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginRight: '100%' }}>
                <SwipeablePanel
                    closeRootStyle={{ backgroundColor: '#111' }}
                    noBar={true}
                    {...panelProps} isActive={isPanelActive}>
                    <View style={{ backgroundColor: '#111', flex: 1 }}>
                        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', alignSelf: 'center', marginTop: 20, marginBottom: 10 }}>Event Privacy</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ margin: 15, flexDirection: 'column' }}>
                                <Text style={{ color: 'white', fontSize: 21, fontWeight: 'bold' }}> Private </Text>
                                <Text style={{ color: 'grey', fontSize: 17, }}> Only People who are invited </Text>
                            </View>

                            <View style={{ margin: 20 }}>

                                <RadioButton
                                    uncheckedColor='grey'
                                    color='#E4C265'
                                    value="private"
                                    status={privacy === 'private' ? 'checked' : 'unchecked'}
                                    onPress={() => setPrivacy('private')}
                                />
                            </View>

                        </View>



                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ margin: 15, flexDirection: 'column' }}>
                                <Text style={{ color: 'white', fontSize: 21, fontWeight: 'bold' }}> Public </Text>
                                <Text style={{ color: 'grey', fontSize: 17, }}> Anyone on this planet </Text>
                            </View>


                            <View style={{ margin: 15, marginLeft: '19%', alignSelf: 'flex-end' }}>
                                <RadioButton

                                    uncheckedColor='grey'
                                    color='#E4C265'
                                    value="public"
                                    status={privacy === 'public' ? 'checked' : 'unchecked'}
                                    onPress={() => setPrivacy('public')}
                                />
                            </View>
                        </View>



                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ margin: 15, flexDirection: 'column' }}>
                                <Text style={{ color: 'white', fontSize: 21, fontWeight: 'bold' }}> Friends </Text>
                                <Text style={{ color: 'grey', fontSize: 17, }}> Your friends only </Text>
                            </View>

                            <View style={{ margin: 15, marginLeft: '29%', alignSelf: 'flex-end' }}>

                                <RadioButton
                                    uncheckedColor='grey'
                                    color='#E4C265'
                                    value="friends"
                                    status={privacy === 'friends' ? 'checked' : 'unchecked'}
                                    onPress={() => setPrivacy('friends')}
                                />
                            </View></View>




                        <View style={{ margin: 300 }}>

                        </View>




                    </View>
                </SwipeablePanel>

            </View>
        */}


            <View style={{ flexDirection: 'row', marginTop: 20 }}>

                <LinearGradient
                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                    colors={['#C08A3A', '#E8C778', '#CBB870']}
                    //colors={['#7B5337', '#BA984B', '#ECC966', '#ECC966', '#BA984B']}

                    //   colors={['#B37F29', '#EDD156', '#EDD156', '#B37F29']}
                    style={{
                        height: 60,

                        width: '100%',
                        bottom: 0, justifyContent: 'center', alignItems: 'center'
                    }}

                >

                    <TouchableOpacity
                        style={{
                            alignItems: 'center',


                            justifyContent: 'center',
                        }}
                        
                        onPress={updateEvent}
                   


                    >


                        <Text style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 30,
                            color: '#242424',
                        }}>
                            Update
                    </Text>


                    </TouchableOpacity>
                </LinearGradient>

            </View>





        </View>




    </ScrollView>


);
};


export default EditEvent;


const styles = StyleSheet.create({

container: {

    flex: 1,
    paddingBottom: 25,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#010504',

},


labelContainer: {
    alignSelf: 'flex-start',
    marginLeft: 16
},
labelText: {
    fontSize: 35,
    fontWeight: 'bold',

    color: 'white'
},
inputContainer: {
    borderColor: Colors.gold,
    backgroundColor: Colors.grey,
    borderBottomWidth: 1,

    width: 300,
    height: 50,
    marginBottom: 10,
    flexDirection: 'row',


},
inputs: {




    color: 'white',
    fontSize: 20,


},
buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 200,
    borderRadius: 30,
    backgroundColor: 'transparent'
},
loginButton: {
    backgroundColor: Colors.gold,

},


text_back: {
    textAlign: 'center',

    fontSize: 25,
    color: Colors.gold_brown,
},

})

