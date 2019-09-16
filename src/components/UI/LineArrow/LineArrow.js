import React from "react";
import { TouchableOpacity, TouchableNativeFeedback, View, StyleSheet, Platform, } from "react-native";
import HeadingTxt from "../../UI/HeadIngTxt/HeadIngTxt";
import Icon from 'react-native-vector-icons/Ionicons';
const LineArrow = props => {

    const content = (

        <View style={styles.txtBlock}>
            <View style={styles.txtUnderLine}><HeadingTxt style={styles.txtStyle}>{props.linkTxt}</HeadingTxt></View>
            <Icon style={{ paddingRight: 10 }} name="md-arrow-round-forward" size={20} />
        </View>

    );

    if (Platform.OS == "android") {
        return (
            <View style={[styles.outer, props.style]}>
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
        alignItems: "center",
        justifyContent: "center"
    },
    txtBlock: {
        flexDirection: "row",
    },
    txtUnderLine: {
        borderBottomWidth: 2,
        borderBottomColor: "rgb(87, 137, 250)",
    },
    txtStyle: {
        height: "100%",
        fontSize: 14,
        // textAlign: 'center',
        color: "#233238",
        paddingRight: 5,
    }
})

export default LineArrow;