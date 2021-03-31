import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import moment from "moment";

import {
    Feather
} from '@expo/vector-icons';




const Agendaa = ({  navigation }) => {



    const [dateSelected, setDateSelected] = useState(moment());
    const [dayOfTheEvent, setDayOfTheEvent] = useState('');

    useEffect(() => {
        switch (moment(dateSelected).day()) {

            case 1:
                setDayOfTheEvent('Monday')
                break;

            case 2:
                setDayOfTheEvent('Tuesday')
                break;

            case 3:
                setDayOfTheEvent('Wednesday')
                break;

            case 4:
                setDayOfTheEvent('Thursday')
                break;

            case 5:
                setDayOfTheEvent('Friday')

                break;
            case 6:
                setDayOfTheEvent('Saturday')
                break;

            case 0:
                setDayOfTheEvent('Sunday')
                break;

            default:

        }
    }, [dateSelected])




    let datee = JSON.stringify(dateSelected);
    let month = datee.substring(6, 8);
    let annee = datee.substring(1, 5);
    let dayy = datee.substring(9, 11);

    switch (month) {

        case '01':
            month = 'Janvier'
            break;

        case '02':
            month = 'Fevrier'
            break;

        case '03':
            month = 'Mars'
            break;

        case '04':
            month = 'Avril'
            break;

        case '05':
            month = 'Mai'

            break;
        case '06':
            month = 'Juin'
            break;

        case '07':
            month = 'Juillet'
            break;

        case '08':
            month = 'Aout'
            break;

        case '09':
            month = 'Septembre'
            break;

        case '10':
            month = 'Octobre'
            break;

        case '11':
            month = 'Novembre'
            break;

        case '12':
            month = 'Decembre'
            break;


        default:


    }
    ////////////////////////////////////////////////


    return (

        <ScrollView>
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.pop()}
                style={{ margin: '3%', width: 40, height: 40, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}
            >
                <Feather
                    style={{ opacity: 0.5 }}
                    name="arrow-left"
                    size={25}

                    color='#CCAA61'
                />
            </TouchableOpacity>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: -75, }}>


                <Image source={require('../../assets/circle.jpg')} style={{ width: '70%', height: 290 }}>
                </Image>
                <View style={{ marginTop: -220, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>

                    <Text style={{
                        fontSize: 50, fontWeight: 'bold', color: Colors.bege, marginBottom: -10, textShadowColor: '#BDA379',
                        textShadowOffset: { width: -1, height: -1 },
                        textShadowRadius: 13,
                    }} >  {dayy}  </Text>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: Colors.bege, marginBottom: 5 }} > {dayOfTheEvent}   </Text>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }} >  {month} {annee} </Text>

                </View>

            </View>

            <Calendar





                markedDates={{
                    [dateSelected]: { selected: true, selectedColor: '#AD7941', color: 'black' }


                }} // bech trod eday selectionne markee bel asfar



                onDayPress={(day) => {



                    setDateSelected(day.dateString);
                    console.log(day.dateString)

                }}



                onMonthChange={(month) => { setDateSelected(month.dateString) }}
                enableSwipeMonths={true}


                theme={{
                    calendarBackground: 'transparent',
                    dayTextColor: 'white',
                    textDisabledColor: 'grey',
                    todayTextColor: '#AD7941',
                    monthTextColor: 'transparent',
                    weekTextColor: Colors.gold,
                    dotColor: Colors.gold,
                    textMonthFontWeight: 'bold',
                    textMonthFontSize: 40,
                    textDayFontSize: 15,
                    textDayontWeight: 'bold',
                    textDayHeaderFontWeight: 'bold',
                    arrowColor: "#AD7941",


                }}
            />

            {/** <Text style={{ color: 'white' }} >{dateSelected}</Text> */}


            <View style={{ width: '100%', alignItems: 'center', marginTop: 35 }}>

                <View style={{ alignItems: 'center', flexDirection: 'row', marginBottom: 40 }} >
                    <Feather
                        name="check"
                        size={30}

                        color='#AD7941'
                    />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginLeft: 5 }}>Wohoo! No Events Today!</Text>


                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate('AddEvent', { selectedDay: dayOfTheEvent, day: dayy, month: month, year: annee, dateSelected: dateSelected })}


                    style={{
                        width: 500, height: 50, backgroundColor: '#111',
                        justifyContent: 'center', alignItems: 'center', bottom: 0, position: 'relative',
                        borderBottomWidth: 1.5, borderColor: '#AD7941'
                    }}>

                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Add Event </Text>
                </TouchableOpacity>

            </View>


        </View>
    </ScrollView>
);
};

export default Agendaa;
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
},
});