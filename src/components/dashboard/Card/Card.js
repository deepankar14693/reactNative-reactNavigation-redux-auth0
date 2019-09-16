import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import ColorHead from '../../UI/ColorHead/ColorHead';
import HeadingTxt from '../../UI/HeadIngTxt/HeadIngTxt';
import LineArrow from '../../UI/LineArrow/LineArrow';
import DetailBoxButton from '../../UI/DetailBoxButton/DetailBoxButton'

class Card extends Component {

    

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <ColorHead colorStyle={this.props.colorStyle}></ColorHead>
                     <HeadingTxt style={styles.headTxt}>{this.props.titleTxt}</HeadingTxt>
                     <HeadingTxt style={styles.numTxt}>{this.props.numTxt}</HeadingTxt>
                     <HeadingTxt style={styles.detailTxtStyle1}>{this.props.detailTxt1}</HeadingTxt>
                     <HeadingTxt style={styles.detailTxtStyle2}>{this.props.detailTxt2}</HeadingTxt>
                     {this.props.linkTxt && <LineArrow style={styles.linkStyle} linkTxt={this.props.linkTxt}></LineArrow>} 
                     {this.props.detailButtonTxt && <DetailBoxButton style={styles.detailButtonTxtStyle} detailButtonTxt={this.props.detailButtonTxt}></DetailBoxButton>} 
                </View>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
        
    },
    innerContainer: {
        flex: 1,
        width: "90%",
        borderRadius : 6,
        height: 320,
        borderWidth: 1,
        borderColor: "#e3e8ee",
        backgroundColor: "#fff",
        //box shadow IOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,  
        //box shadow Android
        elevation: 6
       // flexDirection: "column"

    },
    headTxt: {
        fontSize: 16,
        fontWeight: "600",
        color: "#233238",
        textAlign: "center",
       height: 60,
       paddingTop: 20,
       // padding : "12%",

      //  lineHeight: 1.2,
    },
    numTxt: {
     //   width: "100%",
     height: 60,
        fontSize: 40,
        fontWeight: "300",
     //   lineHeight: 1,
        textAlign: "center",
        color: "#233238",
        paddingTop: 6,
        
    },
    detailTxtStyle1: {
      //  width: "86%",
      height: 30,
        fontSize: 14,
        textAlign: 'center',
        color: "#233238",
        
     //   margin: "0 auto",
    },
    detailTxtStyle2:{
        height: 60,
        fontSize: 14,
        textAlign: 'center',
        color: "#233238",
        marginTop: 5,
    },
    linkStyle:{
        height: 20,
        textAlign: 'center',
        color: "#233238",
        marginTop: 5,
    },
    detailButtonTxtStyle:{
        
        justifyContent: "center",
        alignItems: "center",
       // textAlign: "center",
        width: "25%",
        borderWidth: 0.5,
        borderColor: "#B0BCD0",
        color: "#566F99",
        paddingTop: 4,
        borderRadius: 5
        

    }

})

export default Card;