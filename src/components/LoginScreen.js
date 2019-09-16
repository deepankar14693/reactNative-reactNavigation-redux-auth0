import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, Image, ScrollView, Button, Alert } from 'react-native';
import TypeBox from '../components/UI/TypeBox/TypeBox';
import LogButton from '../components/UI/CustomButtons/LogButton';
import Auth0 from 'react-native-auth0';
//import { Button } from 'react-native-elements';

import credentials from '../../src/auth0-credentials'
//var credentials = require('../../src/auth0-credentials');
const auth0 = new Auth0(credentials);
import { setLocalStorageKey, getLocalStorageKey, removeLocalStorageKey } from '../common/utils';
import { isTokenExpired } from './isTokenExpired';

const imgURI = 'https://static.vicicentral.com/images/ViciPattern.png';
const viciLogo = 'https://static.vicicentral.com/images/ViciCentralLogo.png';

class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { idToken: null, credentials: null };
    }

    async componentDidMount() {
        const idToken = await getLocalStorageKey("idToken");
        const isTokenExpiredCheck = isTokenExpired(idToken);
        this.setState({ idToken: isTokenExpiredCheck ? null : idToken })
    }

    _onLogin = () => {
        auth0.webAuth
            .authorize({
                scope: 'openid profile offline_access',
                audience: 'https://' + credentials.domain + '/userinfo'
            })
            .then(credentials => {

                (async () => await setLocalStorageKey("idToken", credentials.idToken.toString()))();

                this.setState({ idToken: credentials.idToken, credentials: credentials });
            })
            .catch(error => {
                console.log(error)
            });
    };

    _onLogout = () => {
        auth0.webAuth
            .clearSession({})
            .then(success => {
                (async () => { await removeLocalStorageKey("idToken"); this.setState({ idToken: null }); })();
            })
            .catch(error => {
                console.log("Log out cancelled");
            });
    };

    _refreshToken = () => {
        auth0
            .auth
            .refreshToken({ refreshToken: 'user refresh_token' })
            .then(console.log)
            .catch(console.error);
    }

    navigateToMainScreen = () => {
        this.props.navigation.navigate('Home');
    }

    render() {

        // let loggedIn = this.state.idToken === null ? false : true;
        let loggedIn = true;

        return (
            <ImageBackground source={{ uri: imgURI }} style={styles.container}
                imageStyle={{ resizeMode: 'repeat', backfaceVisibility: 'visible' }}>
                <View style={styles.innerContainer}>
                    <View style={styles.userBlock}>
                        <Text style={styles.usernameStyle}>Username</Text>
                        <View style={styles.ButtonStyle}>
                            <LogButton logText={loggedIn ? "LOG OUT" : "LOG IN"} onPress={loggedIn ? this._onLogout : this._onLogin}></LogButton>
                        </View>
                    </View>
                    <Image source={{ uri: viciLogo }} style={styles.viciLogoImg}></Image>
                    <Text style={styles.clientBlock}>CLIENTS</Text>
                    <View style={styles.horizentalLine}></View>
                    <View style={styles.horizentalLine}></View>
                    {loggedIn && <ScrollView>
                        <View style={styles.typeBoxView}>
                            <TypeBox title="Demo" subTitle="Optional second line" onPress={this.navigateToMainScreen}></TypeBox>
                            <TypeBox title="Demo" subTitle="Optional second line" onPress={this.navigateToMainScreen}></TypeBox>
                        </View>
                    </ScrollView>}

                </View>
            </ImageBackground>
        )
    }
}

export default LoginScreen;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#1b3f77",
        width: "100%",
        height: "100%",
    },
    innerContainer: {
        height: "96%",
        padding: "3%",
    },
    userBlock: {
        height: "27%",
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingTop: "5%",
    },
    usernameStyle: {
        marginLeft: 5,
        marginRight: 8,
        fontSize: 18,
        color: "#fff"
    },
    ButtonStyle: {
        marginLeft: 5,
        marginRight: 5,
    },
    viciLogoImg: {
        width: "100%",
        height: "9%",
        marginBottom: 48,
        resizeMode: 'contain',
    },
    clientBlock: {
        fontSize: 24,
        color: "#fff",
        fontWeight: "100",
    },
    horizentalLine: {
        height: 1,
        width: "100%",
        borderBottomWidth: 1,
        // padding: 2,
        paddingBottom: 4,
        borderColor: "#fff",
    },
    typeBoxView: {
        marginTop: 20,
    },

});