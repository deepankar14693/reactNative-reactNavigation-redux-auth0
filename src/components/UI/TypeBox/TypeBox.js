import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, Image, TouchableOpacity, TouchableNativeFeedback, Platform, } from 'react-native';

const blankLogo = 'https://static.vicicentral.com/images/blank-vicicentral-logo.png';


class TypeBox extends Component {


    render() {

        const PlatformName = Platform.OS;

        const content = (
            <View style={styles.container}>
                <Image source={{ uri: blankLogo }} style={styles.imgStyle}></Image>
                <View style={styles.typeText}>
                    <Text style={styles.titleText}>{this.props.title}</Text>
                    <Text style={styles.subtitleText}>{this.props.subTitle}</Text>
                </View>
            </View>

        );

        return (
          <View>
            {PlatformName == "android"?
                (<TouchableNativeFeedback onPress={this.props.onPress}>
                    {content}
                </TouchableNativeFeedback>) :
                (<TouchableOpacity onPress={this.props.onPress}>
                    {content}
                </TouchableOpacity>)
            }
         </View>
        )
    }
}

export default TypeBox;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        // height: "10%",
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        //  opacity: 0.2,
        borderRadius: 4,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: "5%",
        paddingRight: "5%"
    },
    imgStyle: {
        height: 40,
        width: 80,
        resizeMode: "contain",
        margin: 5,

    },
    typeText: {
        marginLeft: 8,
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: -13,
    },
    titleText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: 'bold',


    },
    subtitleText: {
        color: "#fff",
        fontSize: 12,
        marginTop: -5,
        fontStyle: "italic",
    }
});