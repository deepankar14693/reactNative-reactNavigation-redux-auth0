import React from "react";
import { TouchableOpacity, TouchableNativeFeedback, View, StyleSheet, Platform, Text } from "react-native";

const DetailBoxButton = props => {
    const content = (

        <View style={[styles.boxStyle, props.style]}>
            <Text style={styles.textStyle}>{props.detailButtonTxt}</Text>
        </View>

    );

    if (Platform.OS = "android") {
        return (
            <View style={styles.outer}>
                <TouchableNativeFeedback onPress={props.onPress}>
                    {content}
                </TouchableNativeFeedback>
            </View>
        );
    }

    return (
        <View style={[styles.outer, props.style]}>
            <TouchableOpacity onPress={props.onPress}>
                {content}
            </TouchableOpacity>
        </View>
    );

}



const styles = StyleSheet.create({
    outer: {
        // width: "100%",
        //  height: 10,
        height:30,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    boxStyle:{
        justifyContent: "center"
    },   
    textStyle: {
        height: "100%",
        fontSize: 14,
        textAlign: 'center',
        // textAlign: 'center',
    }
})

export default DetailBoxButton;