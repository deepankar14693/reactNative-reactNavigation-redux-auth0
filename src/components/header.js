import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export const Header = (props) => {
    return (
        <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{props.headerText}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewStyle: {
        // backgroundColor: '#F8F8F8',
        backgroundColor: '#4371c5',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 5 },
        // shadowOpacity: 0.2,
        elevation: 2
    },
    textStyle: {
        fontSize: 20
    }
})

export default Header;
