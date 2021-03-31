import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ImageBackground, ActivityIndicator, Platform, Alert, TouchableNativeFeedback, Dimensions } from 'react-native';
import {
    Feather
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/Colors';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Participant from '../../components/UI/ParticipantIcon';


const EventItem = (props) => {

    const { event } = props;

   // const [joined, setJoined] = useState(event.joined)
    const navigation = useNavigation();


    let TouchableComp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComp = TouchableNativeFeedback;
    }


    return (


        <View  >
            <TouchableOpacity

                style={{ flex: 1 }}
                onPress={

                    navigation.navigate('Event')}
            >
                <LinearGradient
                    // colors={['#B78628', '#C69320']}
                    colors={['#1D1D1D', '#1D1D1D']}
                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                    style={styles.event}

                >

                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.name}>


                            <Text style={{ color: 'grey', fontSize: 12, marginBottom: 2 }}>

                                {event.date} , {event.time} - {event.EndTime}
                            </Text>





                            <View>
                                {event.name.length > 25 ? (




                                    <Text
                                        style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}

                                    >
                                        {event.name.substring(0, 25)}
                                        ...
                                    </Text>


                                ) : (
                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                                        {event.name}
                                    </Text>

                                )}
                            </View>




                            <View style={{ marginTop: 5 }}>
                                <FlatList
                                    data={event.participants.length > 3 ?
                                        event.participants.slice(0, 3) :  // ken les participant > men 3 raja3li just les 3 premiers
                                        (event.participants)}

                                    keyExtractor={item => item.userName}
                                    horizontal


                                    renderItem={(participant) => {

                                        return (
                                            <Participant participant={participant.item} />
                                        )
                                    }}

                                />

                            </View>

                        </View>


                        <TouchableOpacity
                            style={styles.join}
                            //disabled={event.private === true ? true : false}
                            onPress={() => { setJoined(!joined) }}

                        >
                            {joined === true ? (
                                <Feather
                                    name="check"
                                    size={20}

                                    color={Colors.gold}
                                />
                            ) : (
                                <Text style={{ color: Colors.gold, fontWeight: 'bold' }}> Join</Text>
                            )}



                        </TouchableOpacity>

                    </View>
                </LinearGradient>

            </TouchableOpacity>
        </View>





    );
};

export default EventItem;


const styles = StyleSheet.create({
    event: {
        height: 100,
        width: 310,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,


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

        marginRight: 40

    }

});