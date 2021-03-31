import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ImageBackground, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { Feather, Ionicons } from '@expo/vector-icons'
import { Button } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { timeDifference, upComingEvents } from '../../helpers/timeDifference';
import ENV from '../../env';
import EventMenu from "../../components/UI/EventMenu";

const Event = (props) => {
    const event = props.route.params.eventObject;
    const userId = props.route.params.userId;
 





    const navigation = useNavigation();






    return (

        <ImageBackground source={require('../../assets/black_bg.jpg')}
            style={{
                flex: 1,
                resizeMode: "cover",
                justifyContent: "center"
            }}>
            <ScrollView >

                <View style={{ alignItems: 'flex-start' }}>

                    <Image
             source={{ uri: `${ENV.apiUrl}/event/photo/${event._id}?${new Date(event.updated)}` }}
                        style={{ width: '100%', height: 260 }} >


                    </Image>





                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                        <TouchableOpacity style={{ backgroundColor: Colors.bege, width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }} >
                            <Image

                                source={require('../../assets/arrow.png')}

                                style={{ width: 15, height: 15, transform: [{ rotate: '-180deg' }] }} />

                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: Colors.myGold, width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }} >
                            <Image

                                source={require('../../assets/arrow.png')}

                                style={{ width: 15, height: 15 }} />

                        </TouchableOpacity>

                    </View>


                    { event.postedBy._id === userId && (
             <View style={{ marginTop: -300, marginBottom: 210, width: '100%' }}>

                        <TouchableOpacity


                            onPress={() => navigation.pop()}
                            style={{ alignSelf: 'flex-start', marginLeft: 10 }}
                        >
                            <Ionicons
                                name="md-arrow-back"
                                size={30}

                                color='black'
                            />
                        </TouchableOpacity>
                        <TouchableOpacity

                            style={{
                                alignSelf: 'flex-end', marginRight: 10, backgroundColor: '#111', opacity: 0.7, marginTop: -15,
                                width: 45, height: 45, borderRadius: 50, alignItems: 'center', justifyContent: 'center'
                            }}
                        >
                            <EventMenu event_id={event._id}/>
                        </TouchableOpacity>


                    </View>

                    )}




                </View>







                <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
                    <View >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>{event.title} </Text>


                           

                        </View>



                        <Text style={{ color: Colors.bege, fontSize: 15, fontWeight: 'bold' }}> 22/20/1999</Text>
                        {/**   <Text style={{ color: Colors.gold }}>{upComingEvents(new Date('21 March, 2021  9:30 PM'), new Date())}</Text>*/}


                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: 'grey', fontSize: 15, fontWeight: 'bold' }}> Loaction: </Text>

                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}> {event.place} </Text>

                    </View>



                    <View style={{

                        marginTop: 20

                    }}>
                        <Text style={{ color: 'grey', fontSize: 15, fontWeight: 'bold' }}> Details: </Text>
                        <Text style={{ color: 'white', fontSize: 16, }}> {event.description} </Text>
                    </View>


                    <View>
                        <Image

                            source={require('../../assets/seperator.png')}

                            style={{ width: 50, height: 10, margin: 15, resizeMode: 'contain', tintColor: 'grey' }} />
                    </View>

                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <View style={{ marginRight: '15%' }}>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}> Hosted by  </Text>
                            <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}> Darius</Text>

                        </View>

                        <View style={{ marginLeft: '15%', alignItems: 'center' }}>

                            <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Participants  </Text>
                            <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}> num here</Text>

                        </View>

                    </View>





                    {/** 
                    <View style={{ margin: 5 }} >
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'grey' }} > {participants.length} Membres</Text>

                        <FlatList
                            data={participants}

                            style={{ margin: 10 }}
                            keyExtractor={item => item.userName}
                            horizontal


                            renderItem={(participant) => {

                                return (
                                    <View style={{ marginRight: 8, alignItems: 'center' }}>


                                        <ImageBackground
                                            source={{ uri: participant.item.userImage }}
                                            style={{ width: 60, height: 60 }}>

                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image

                                                    source={require('../../assets/pic_cover.png')}

                                                    style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }} />
                                            </View>

                                        </ImageBackground>

                                        <Text style={{ color: 'white', fontWeight: 'bold' }}>{participant.item.userName}</Text>

                                    </View>
                                )
                            }}

                        />

                    </View>

*/}

                </View>



                <View
                >

                    <LinearGradient
                        colors={['#C08A3A', '#E8C778', '#CBB870']}
                        style={{ bottom: 0, marginTop: 30 }}

                        start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}>

                        <TouchableOpacity
                            style={{ width: '100%', height: 60, alignItems: 'center', justifyContent: 'center' }}
                        >

                            <Text style={{ color: '#252525', fontWeight: 'bold', fontSize: 30 }}>Join </Text>


                        </TouchableOpacity>
                    </LinearGradient>
                </View>



            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({

    avatar: {
        width: 25,
        height: 25,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'black',
        marginLeft: -5
    },

})

export default Event;