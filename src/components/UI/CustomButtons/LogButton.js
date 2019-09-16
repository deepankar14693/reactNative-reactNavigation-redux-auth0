import React from "react";
import { TouchableOpacity, TouchableNativeFeedback, Text, View, StyleSheet, Platform, } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const LogButton = props => {
    const content = (
        <View style={styles.borderBox} >
            <Text style={styles.logText}>{props.logText}</Text>
            <Icon style={styles.iconStyle} name="md-arrow-round-forward" size={20} />
        </View>
        /* <View style={[styles.button, { backgroundColor: props.color }, props.disabled ? styles.disabled : null]}>
            <Text style={props.disabled ? styles.disableText : null}>{props.children}</Text>
        </View> */
    );

    /* if(props.disabled){
        return content;
    } */

    if (Platform.OS == "android") {
        return (<TouchableNativeFeedback onPress={props.onPress}>
            {content}
        </TouchableNativeFeedback>
        );
    }

    return (
        <TouchableOpacity onPress={props.onPress}>
            {content}
        </TouchableOpacity>
    );

}

export default LogButton;

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "black",
    },
    disabled:{
        backgroundColor: "#eee",
        borderColor: "#aaa"
    },
    disableText:{
        color: "#aaa"
    },
    borderBox:{
        borderWidth: 2,
        flexDirection: "row",
        borderColor: '#fff',
        height: 30,
        //justifyContent: "center",
        alignItems: "center",
        

        
    },
    logText:{
        fontSize: 14,
        fontWeight: "bold",
        borderRightWidth: 2,
        borderColor: '#fff',
        color: '#fff',
        paddingRight: 15,
        paddingLeft: 10,
        height: "100%",
        paddingTop: 3,
    },
    iconStyle:{ 
        color:'#fff',
        paddingRight: 5,
        paddingLeft: 5,
     
        alignItems: "center"   
    }
})