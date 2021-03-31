import React from 'react';
import { View, Text, Image, StyleSheet } from "react-native";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
} from 'react-native-popup-menu';
const { SlideInMenu } = renderers;




const ContactMenu = () => {



    return (
        <Menu renderer={SlideInMenu} >
            <MenuTrigger>

                <Image
                    style={{
                        height: 25,
                        width: 25,
                        margin: 5
                    }}
                    source={require('../../assets/icons/user.png')}
                ></Image>
                <Text style={{ color: 'white', fontSize: 10 }}>Options</Text>
                <Text style={{ color: 'white', fontSize: 10 }}>de contact</Text>

            </MenuTrigger>
            <MenuOptions >
                <View style={{ backgroundColor: '#1e1e1e', overflow: 'hidden' }} >
                    <MenuOption onSelect={() => alert(`added`)}>
                        <View style={styles.viewButton}>
                            <Text style={styles.menuButtons}>AJOUTER A MES CONTACTS</Text>
                        </View>
                    </MenuOption>

                    <MenuOption onSelect={() => alert(`signaler`)}>
                        <View style={styles.viewButton}>
                            <Text style={styles.menuButtons}>SIGNALER CE MEMBRE</Text>
                        </View>
                    </MenuOption>
                    <MenuOption onSelect={() => alert(`bloquer`)}>
                        <View style={styles.viewButton}>
                            <Text style={styles.menuButtons}>BLOQUER CE MEMBRE</Text>
                        </View>
                    </MenuOption>
                    <MenuOption style={{ backgroundColor: '#111111' }} onSelect={() => alert(`closed`)}>
                        <View style={styles.viewButton}>
                            <Text style={styles.menuButtons}>ANNULER</Text>
                            <Text style={styles.menuButtons}>   X</Text>
                        </View>
                    </MenuOption>
                </View>
            </MenuOptions>
        </Menu>
    )
}



const styles = StyleSheet.create({

    menuButtons: {
        fontSize: 10,
        color: 'grey',
        alignContent: 'center'

    },

    viewButton: {
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 0.3,
        justifyContent: 'center',
        padding: 5,

    }

})

export default ContactMenu;