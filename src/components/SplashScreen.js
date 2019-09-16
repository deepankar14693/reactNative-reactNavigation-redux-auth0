import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Header from './header';
import IdeaList from './IdeaList';

class SplashScreen extends Component {

    state = {
        mainTextOpacity: new Animated.Value(0.5),
        subTextMarginTop: new Animated.Value(200),
        mainScreen: false
    }

    componentDidMount() {
        Animated.sequence([
            Animated.timing(this.state.mainTextOpacity, {
                toValue: 1,
                duration: 1000,
            }),
            Animated.timing(this.state.subTextMarginTop, {
                toValue: 10,
                duration: 500,
            })
        ]).start(() => {
            // END OF ANIMATION
            // this.props.navigation.navigate('App');
        })
    }

    render() {
        return (
            <View style={{backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center', height: 660}}>
                <Animated.Text style={{ ...styles.mainTextStyle, opacity: this.state.mainTextOpacity }}>VICI CENTRAL</Animated.Text>
                <Animated.Text style={{ ...styles.subTextStyle, marginTop: this.state.subTextMarginTop }}>Generate, Plan and Track IDEAS</Animated.Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainTextStyle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    },
    subTextStyle: {
        fontSize: 20,
        color: 'white'
    }
})

export default SplashScreen;
