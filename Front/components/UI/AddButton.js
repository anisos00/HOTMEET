import React from "react";
import { View, StyleSheet, TouchableHighlight, Animated } from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";

export default class AddButton extends React.Component {

    render() {


        return (
            <View >


                <Text style={{ fontSize: 20, color: "#D3C545" }}> button</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonAdd: {
        alignItems: "center",
        justifyContent: "center",
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: "#7F58FF",

    },

});