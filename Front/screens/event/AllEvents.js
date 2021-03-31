import React, { useState, useCallback, useEffect, useRef } from 'react';

import { SafeAreaView, View, FlatList, TouchableOpacity, ActivityIndicator, Image, StyleSheet, Text, StatusBar } from 'react-native';
import Colors from '../../constants/Colors';

import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import EventItem from '../../components/UI/EventItem';
import { useNavigation } from '@react-navigation/native';


import * as eventActions from '../../store/actions/event';
import * as usersActions from '../../store/actions/users';


const AllEvents = () => {



    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const refEvents = useRef(null);

    const events = useSelector(state => state.events.allEvents);

    const loggedUser = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const navigation = useNavigation();


    // loads all the posts
    const loadEvents = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(eventActions.fetchEvents());
            await dispatch(usersActions.fetchUsers());
            

        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError])


    useEffect(() => {
        const unsubscribe = navigation.dangerouslyGetParent().addListener('tabPress', e => {
            console.log("TAB PRESSED");
            if (refEvents.current) {
                refEvents.current.scrollToIndex({ animated: true, index: 0 });
            }
        });

        return () => {
            unsubscribe();
        };
    }, [])




    useEffect(() => {
        setIsLoading(true);
        loadEvents()
            .then(() => {
                setIsLoading(false);
            });
    }, [dispatch, loadEvents])


    if (error) {
        return (
            <View style={styles.centered} >
                <Text>An error occured.</Text>
                <Button title="Try again" onPress={loadEvents} color={Colors.gold_brown} />
            </View>
        );
    }

    //loading the posts
    if (isLoading) {
        return (
            <View style={styles.centered} >
                <ActivityIndicator size='large' color={Colors.gold_brown} />
            </View>
        );
    }

    


    return (


        <View style={styles.background}  >


            <FlatList
                style={{ marginBottom: 20 }}
                ref={refEvents} 
                data={events}
                style={styles.list}
                onRefresh={loadEvents}
                refreshing={isRefreshing}
               
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}


                renderItem={(event) => {
                    console.log("event - ", event.index);
                    return (

                <EventItem event={event.item} userId={loggedUser._id} />

                    )

                }}





            />
            <LinearGradient
                start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 0.0 }}
                colors={['#C08A3A', '#E8C778', '#CBB870']}
                style={styles.TouchableOpacityStyle} >
                <TouchableOpacity
                    onPress={() => navigation.navigate('Agenda')}
                    style={{
                        width: 49,
                        height: 49,
                        backgroundColor: 'transparent'
                    }}
                    activeOpacity={0.5}>

                    <Image
                        style={{
                            height: 40,
                            width: 40,
                            margin: 5, transform: [{ rotate: '45deg' }],
                            tintColor: '#000'


                        }}
                        source={require('../../assets/icons/plus.png')}
                    ></Image>
                </TouchableOpacity>
            </LinearGradient>
        </View>


    );
}

const styles = StyleSheet.create({

    background: {
        flex: 1,
        width: '100%',
        backgroundColor: "#000",

        alignItems: 'center',
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {  
        width: '100%',
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30, transform: [{ rotate: '45deg' }]
    },
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    },

});

export default AllEvents;